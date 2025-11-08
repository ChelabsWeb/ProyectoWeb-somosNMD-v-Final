"use client";

import type React from "react";
import { useEffect, useRef, useState, useId } from "react";
import * as THREE from "three";
import { useReducedMotionPreference } from "@nmd/animation";

type Effect = "default" | "spark" | "wave" | "vortex";

interface ParticleTextProps {
  text?: string;
  className?: string;
}

export const ParticleText: React.FC<ParticleTextProps> = ({
  text = "SOLO POLVO...",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentEffect, setCurrentEffect] = useState<Effect>("default");
  const prefersReducedMotion = useReducedMotionPreference();
  const particleId = useId();

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    geometry: THREE.BufferGeometry;
    originalPositions: Float32Array;
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

  const currentEffectRef = useRef<Effect>(currentEffect);

  useEffect(() => {
    currentEffectRef.current = currentEffect;
  }, [currentEffect]);

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
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
    const fontSize = 120;
    const padding = 50;

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
    const samplingRate = 2; // Sample every N pixels for performance
    const scale = 0.004; // Scale factor for positioning

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
    const positionsArray = new Float32Array(positions);
    const colorsArray = new Float32Array(colors);
    const originalPositions = positionsArray.slice();
    const velocities = new Float32Array(numParticles * 3);
    const phases = new Float32Array(numParticles);

    for (let i = 0; i < numParticles; i++) {
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.008,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.set(0, 0, 2);

    // Store scene data
    sceneRef.current = {
      scene,
      camera,
      renderer,
      points,
      geometry,
      originalPositions,
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

      let repelStrength = 0;
      if (currentEffectRef.current === "default") {
        repelStrength = 0.05;
      } else if (currentEffectRef.current === "spark") {
        repelStrength = 0.3;
      }

      const attractStrength = 0.05;
      const damping = 0.95;

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
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        const theta = angularSpeed * time + phases[j];
        const swirlDx = radiusSwirl * Math.cos(theta);
        const swirlDy = radiusSwirl * Math.sin(theta);

        const targetX = ox + swirlDx;
        const targetY = oy + swirlDy;
        const targetZ = oz;

        let px = positionAttribute.getX(j);
        let py = positionAttribute.getY(j);
        let pz = positionAttribute.getZ(j);

        let vx = velocities[idx];
        let vy = velocities[idx + 1];
        let vz = velocities[idx + 2];

        // Mouse interaction effects
        if (localIntersection) {
          const dx = px - localIntersection.x;
          const dy = py - localIntersection.y;
          const dz = pz - localIntersection.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const dist = Math.sqrt(distSq);

          if (currentEffectRef.current === "wave") {
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
          } else if (currentEffectRef.current === "vortex") {
            if (distSq < effectRadius * effectRadius && dist > 0.05) {
              const vortexStrength = 0.15;
              const spiralForce = vortexStrength * (1 - dist / effectRadius);
              const tangentX = -dy;
              const tangentY = dx;
              const tangentLength = Math.sqrt(tangentX * tangentX + tangentY * tangentY);

              if (tangentLength > 0.001) {
                vx += (tangentX / tangentLength) * spiralForce;
                vy += (tangentY / tangentLength) * spiralForce;
              }

              const pullStrength = spiralForce * 0.3;
              vx -= (dx / dist) * pullStrength;
              vy -= (dy / dist) * pullStrength;
            }
          } else if (currentEffectRef.current === "default" || currentEffectRef.current === "spark") {
            if (distSq < effectRadius * effectRadius && distSq > 0.0001) {
              const force = (1 - dist / effectRadius) * repelStrength;
              vx += (dx / dist) * force;
              vy += (dy / dist) * force;
              vz += (dz / dist) * force;
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

      {/* Effect selector */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          onClick={() => setCurrentEffect("default")}
          className={`px-4 py-2 text-sm rounded-lg transition-all border ${
            currentEffect === "default"
              ? "bg-white text-black border-white"
              : "bg-black/50 text-white/80 border-white/30 hover:bg-white/10 hover:border-white/50"
          }`}
          aria-label="Default particle effect"
        >
          Default
        </button>
        <button
          onClick={() => setCurrentEffect("spark")}
          className={`px-4 py-2 text-sm rounded-lg transition-all border ${
            currentEffect === "spark"
              ? "bg-white text-black border-white"
              : "bg-black/50 text-white/80 border-white/30 hover:bg-white/10 hover:border-white/50"
          }`}
          aria-label="Spark particle effect"
        >
          Spark
        </button>
        <button
          onClick={() => setCurrentEffect("wave")}
          className={`px-4 py-2 text-sm rounded-lg transition-all border ${
            currentEffect === "wave"
              ? "bg-white text-black border-white"
              : "bg-black/50 text-white/80 border-white/30 hover:bg-white/10 hover:border-white/50"
          }`}
          aria-label="Wave particle effect"
        >
          Wave
        </button>
        <button
          onClick={() => setCurrentEffect("vortex")}
          className={`px-4 py-2 text-sm rounded-lg transition-all border ${
            currentEffect === "vortex"
              ? "bg-white text-black border-white"
              : "bg-black/50 text-white/80 border-white/30 hover:bg-white/10 hover:border-white/50"
          }`}
          aria-label="Vortex particle effect"
        >
          Vortex
        </button>
      </div>
    </div>
  );
};