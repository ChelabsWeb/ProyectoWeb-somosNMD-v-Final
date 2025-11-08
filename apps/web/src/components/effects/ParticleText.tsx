"use client";

import type React from "react";
import { useEffect, useRef, useId, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { useReducedMotionPreference } from "@nmd/animation";

interface ParticleTextProps {
  text?: string;
  className?: string;
}

export type ParticleTextHandle = {
  setProgress: (progress: number) => void;
};

export const ParticleText = forwardRef<ParticleTextHandle, ParticleTextProps>(({
  text = "SOLO POLVO...",
  className = ""
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const particleId = useId();

  // Progress ref for scroll animation (0 = scattered, 1 = formed)
  const progressRef = useRef<{ value: number }>({ value: prefersReducedMotion ? 1 : 0 });

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    geometry: THREE.BufferGeometry;
    originalPositions: Float32Array;
    scatteredPositions: Float32Array;
    targetPositions: Float32Array;
    velocities: Float32Array;
    phases: Float32Array;
    intersectionPoint: THREE.Vector3 | null;
    rotationX: number;
    rotationY: number;
    isDragging: boolean;
    previousMouseX: number;
    previousMouseY: number;
    particleCount: number;
  } | null>(null);

  // Expose setProgress method to parent component
  useImperativeHandle(ref, () => ({
    setProgress: (value: number) => {
      if (progressRef.current) {
        progressRef.current.value = Math.max(0, Math.min(1, value)); // Clamp between 0 and 1
      }
    }
  }), []);

  // Seeded random number generator for consistent scattered positions
  const seededRandom = (seed: number) => {
    let value = seed;
    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, // Reduced FOV for less distortion
      canvas.width / canvas.height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor(0x000000, 0);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    // Create text texture for particle sampling
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d")!;
    const fontSize = 180; // Increased font size
    const padding = 80; // Increased padding

    textCtx.font = `bold ${fontSize}px "Space Grotesk", "Geist", sans-serif`;
    const metrics = textCtx.measureText(text);

    textCanvas.width = metrics.width + padding * 2;
    textCanvas.height = fontSize + padding * 2;

    // Clear and draw text
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textCtx.font = `bold ${fontSize}px "Space Grotesk", "Geist", sans-serif`;
    textCtx.fillStyle = "#ffffff";
    textCtx.textBaseline = "middle";
    textCtx.textAlign = "center";
    textCtx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);

    // Sample pixels to create particles
    const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
    const pixels = imageData.data;

    const positions: number[] = [];
    const colors: number[] = [];
    const samplingRate = 2; // Optimal sampling for performance
    const scale = 0.0025; // Smaller scale for better fit

    for (let y = 0; y < textCanvas.height; y += samplingRate) {
      for (let x = 0; x < textCanvas.width; x += samplingRate) {
        const index = (y * textCanvas.width + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha > 128) {
          // Position relative to center
          const px = (x - textCanvas.width / 2) * scale;
          const py = -(y - textCanvas.height / 2) * scale;
          const pz = (Math.random() - 0.5) * 0.1;

          positions.push(px, py, pz);

          // Black and white color scheme
          const brightness = 1.0; // Pure white for all particles
          colors.push(
            brightness,  // R: white
            brightness,  // G: white
            brightness   // B: white
          );
        }
      }
    }

    const numParticles = positions.length / 3;
    const targetPositions = new Float32Array(positions); // Final text positions
    const colorsArray = new Float32Array(colors);

    // Generate scattered initial positions using seeded random
    const seed = particleId.split(':').reduce((acc, val) => acc + val.charCodeAt(0), 0);
    const random = seededRandom(seed);

    const scatteredPositions = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const idx = i * 3;
      // Scatter particles across a wider area
      scatteredPositions[idx] = (random() - 0.5) * 6;     // X: -3 to 3
      scatteredPositions[idx + 1] = (random() - 0.5) * 4; // Y: -2 to 2
      scatteredPositions[idx + 2] = (random() - 0.5) * 2; // Z: -1 to 1
    }

    // Start with scattered positions (will be interpolated based on progress)
    const positionsArray = new Float32Array(numParticles * 3);

    // Initialize positions based on initial progress
    const initialProgress = progressRef.current.value;
    for (let i = 0; i < numParticles; i++) {
      const idx = i * 3;
      positionsArray[idx] = scatteredPositions[idx] + (targetPositions[idx] - scatteredPositions[idx]) * initialProgress;
      positionsArray[idx + 1] = scatteredPositions[idx + 1] + (targetPositions[idx + 1] - scatteredPositions[idx + 1]) * initialProgress;
      positionsArray[idx + 2] = scatteredPositions[idx + 2] + (targetPositions[idx + 2] - scatteredPositions[idx + 2]) * initialProgress;
    }

    const originalPositions = targetPositions.slice(); // Keep for compatibility
    const velocities = new Float32Array(numParticles * 3);
    const phases = new Float32Array(numParticles);

    for (let i = 0; i < numParticles; i++) {
      phases[i] = random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.01, // Slightly larger particles for better visibility
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Center the text properly
    points.position.set(0, 0, 0); // Center position
    camera.position.set(0, 0, 2.5); // Optimal distance for viewing
    camera.lookAt(0, 0, 0);

    // Store scene data
    sceneRef.current = {
      scene,
      camera,
      renderer,
      points,
      geometry,
      originalPositions,
      scatteredPositions,
      targetPositions,
      velocities,
      phases,
      intersectionPoint: null,
      rotationX: 0,
      rotationY: 0,
      isDragging: false,
      previousMouseX: 0,
      previousMouseY: 0,
      particleCount: numParticles,
    };

    // Mouse move handler for particle effects
    const handleMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      mouse.x = (offsetX / canvas.clientWidth) * 2 - 1;
      mouse.y = -(offsetY / canvas.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersect = new THREE.Vector3();

      if (raycaster.ray.intersectPlane(plane, intersect)) {
        sceneRef.current.intersectionPoint = intersect;
      }
    };

    const handleMouseLeave = () => {
      if (sceneRef.current) {
        sceneRef.current.intersectionPoint = null;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    let animationId: number;
    const animate = (timestamp: number) => {
      if (!sceneRef.current) return;

      const time = timestamp * 0.001;
      const {
        geometry,
        points,
        originalPositions,
        scatteredPositions,
        targetPositions,
        velocities,
        phases,
        intersectionPoint,
        rotationX,
        rotationY,
        particleCount,
      } = sceneRef.current;

      const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
      const colorAttribute = geometry.getAttribute("color") as THREE.BufferAttribute;

      const radiusSwirl = 0.005;
      const angularSpeed = 0.5;
      const effectRadius = 0.3;

      // Easing function for smoother transitions
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      // Get current progress (0 = scattered, 1 = formed)
      const progress = easeOutCubic(progressRef.current.value);

      // Increase attraction strength during formation (lower progress values)
      const attractStrength = progress < 0.9 ? 0.15 : 0.05;
      const damping = progress < 0.9 ? 0.9 : 0.95;

      // Update rotations
      points.rotation.y += (rotationY - points.rotation.y) * 0.1;
      points.rotation.x += (rotationX - points.rotation.x) * 0.1;

      // Compute inverse quaternion
      const euler = new THREE.Euler(points.rotation.x, points.rotation.y, points.rotation.z, "XYZ");
      const inverseQuaternion = new THREE.Quaternion().setFromEuler(euler).invert();

      let localIntersection: THREE.Vector3 | null = null;
      if (intersectionPoint) {
        localIntersection = intersectionPoint.clone().applyQuaternion(inverseQuaternion);
      }

      // Update particles
      for (let j = 0; j < particleCount; j++) {
        const idx = j * 3;

        // Get scattered and target positions
        const sx = scatteredPositions[idx];
        const sy = scatteredPositions[idx + 1];
        const sz = scatteredPositions[idx + 2];

        const tx = targetPositions[idx];
        const ty = targetPositions[idx + 1];
        const tz = targetPositions[idx + 2];

        // Interpolate between scattered and target based on progress
        const baseX = sx + (tx - sx) * progress;
        const baseY = sy + (ty - sy) * progress;
        const baseZ = sz + (tz - sz) * progress;

        // Only add swirl when particles are forming the text (progress > 0.7)
        let targetX = baseX;
        let targetY = baseY;
        let targetZ = baseZ;

        if (progress > 0.7) {
          const theta = angularSpeed * time + phases[j];
          const swirlIntensity = (progress - 0.7) / 0.3; // 0 at progress=0.7, 1 at progress=1
          targetX += radiusSwirl * Math.cos(theta) * swirlIntensity;
          targetY += radiusSwirl * Math.sin(theta) * swirlIntensity;
        }

        let px = positionAttribute.getX(j);
        let py = positionAttribute.getY(j);
        let pz = positionAttribute.getZ(j);

        let vx = velocities[idx];
        let vy = velocities[idx + 1];
        let vz = velocities[idx + 2];

        // Wave interaction effect (only when particles are mostly formed)
        if (localIntersection && progress > 0.8) {
          const dx = px - localIntersection.x;
          const dy = py - localIntersection.y;
          const dz = pz - localIntersection.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const dist = Math.sqrt(distSq);

          if (distSq < effectRadius * effectRadius) {
            const waveStrength = 0.2;
            const waveFreq = 15;
            const wavePhase = time * 8 - dist * waveFreq;
            const waveForce = Math.sin(wavePhase) * waveStrength * (1 - dist / effectRadius);

            if (dist > 0.001) {
              vx += (dx / dist) * waveForce;
              vy += (dy / dist) * waveForce;
              vz += waveForce * 0.5;
            }
          }
        }

        // Attract to target
        const attractDx = targetX - px;
        const attractDy = targetY - py;
        const attractDz = targetZ - pz;

        vx += attractDx * attractStrength;
        vy += attractDy * attractStrength;
        vz += attractDz * attractStrength;

        // Damping
        vx *= damping;
        vy *= damping;
        vz *= damping;

        // Update position
        px += vx;
        py += vy;
        pz += vz;

        positionAttribute.setXYZ(j, px, py, pz);

        velocities[idx] = vx;
        velocities[idx + 1] = vy;
        velocities[idx + 2] = vz;

        // Black and white with subtle gray variations on interaction
        let brightness = 1.0; // Base white color

        if (localIntersection) {
          const dx = px - localIntersection.x;
          const dy = py - localIntersection.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < effectRadius) {
            // Create a subtle gray gradient effect on interaction
            const intensity = 1 - dist / effectRadius;
            brightness = 0.7 + intensity * 0.3; // Range from 0.7 (gray) to 1.0 (white)
          }
        }

        colorAttribute.setXYZ(j, brightness, brightness, brightness);
      }

      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return;

      const { camera, renderer } = sceneRef.current;
      camera.aspect = canvas.width / canvas.height;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [text, prefersReducedMotion, particleId]);

  // Mouse drag handlers
  const handleMouseDown = (event: React.MouseEvent) => {
    if (!sceneRef.current) return;
    sceneRef.current.isDragging = true;
    sceneRef.current.previousMouseX = event.clientX;
    sceneRef.current.previousMouseY = event.clientY;
  };

  const handleMouseMoveDrag = (event: React.MouseEvent) => {
    if (!sceneRef.current || !sceneRef.current.isDragging) return;

    const deltaX = event.clientX - sceneRef.current.previousMouseX;
    const deltaY = event.clientY - sceneRef.current.previousMouseY;

    sceneRef.current.rotationY -= deltaX * 0.005;
    sceneRef.current.rotationX -= deltaY * 0.005;

    sceneRef.current.previousMouseX = event.clientX;
    sceneRef.current.previousMouseY = event.clientY;
  };

  const handleMouseUp = () => {
    if (sceneRef.current) {
      sceneRef.current.isDragging = false;
    }
  };

  // Touch handlers
  const handleTouchStart = (event: React.TouchEvent) => {
    if (!sceneRef.current) return;
    sceneRef.current.isDragging = true;
    sceneRef.current.previousMouseX = event.touches[0].clientX;
    sceneRef.current.previousMouseY = event.touches[0].clientY;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!sceneRef.current || !sceneRef.current.isDragging) return;

    const deltaX = event.touches[0].clientX - sceneRef.current.previousMouseX;
    const deltaY = event.touches[0].clientY - sceneRef.current.previousMouseY;

    sceneRef.current.rotationY -= deltaX * 0.005;
    sceneRef.current.rotationX -= deltaY * 0.005;

    sceneRef.current.previousMouseX = event.touches[0].clientX;
    sceneRef.current.previousMouseY = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (sceneRef.current) {
      sceneRef.current.isDragging = false;
    }
  };

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <h2 className="text-6xl md:text-8xl font-bold text-white">
          {text}
        </h2>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={1600}
        height={400}
        className="block w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveDrag}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: "grab" }}
      />
    </div>
  );
});

ParticleText.displayName = "ParticleText";