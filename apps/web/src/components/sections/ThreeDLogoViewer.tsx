"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

function Model({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF("/assets/logo/3D_NMD_LOGO.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (modelRef.current) {
      if (isMobile) {
        // Continuous rotation on Y axis for mobile
        modelRef.current.rotation.y += delta * 0.5;
        // Keep base angle facing forward
        modelRef.current.rotation.x = Math.PI / 2;
        
        // Floating animation
        modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      } else {
        // Smoothly rotate the model based on mouse position (very subtle, facing forward)
        // Base rotation (Math.PI / 2) to show the top of the logo, plus subtle mouse movement
        const baseRotationX = Math.PI / 2; 
        const targetRotationX = baseRotationX + (mouse.y * Math.PI) / 32;
        const targetRotationY = (mouse.x * Math.PI) / 32;

        modelRef.current.rotation.x += 0.05 * (targetRotationX - modelRef.current.rotation.x);
        modelRef.current.rotation.y += 0.05 * (targetRotationY - modelRef.current.rotation.y);
        
        // Floating animation
        modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      }
    }
  });

  // Apply a metallic silver material
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "#E0E0E0", // Light silver/gray base
        roughness: 0.1,   // Very smooth
        metalness: 1.0,   // Fully metallic
        envMapIntensity: 2.0, // Boost environment reflections
      });
    }
  });

  return <primitive object={scene} ref={modelRef} scale={isMobile ? 1 : 3.5} />;
}

export function ThreeDLogoViewer() {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Transform scale and opacity based on scroll position (used only on desktop)
  // 0 to 600 (roughly Hero height): normal size
  // 600 to 1200: scales up and fades out
  const scale = useTransform(scrollY, [0, 600, 1200], [1, 1, 4]);
  const opacity = useTransform(scrollY, [0, 600, 1200], [1, 1, 0]);
  
  // Disable pointer events when scrolling down to avoid blocking interactions
  const pointerEvents = useTransform(scrollY, [0, 500], ["auto", "none"]);

  // We only enable the "mobile view" logic after hydration to avoid SSR errors
  const isMobileView = isMounted && isMobile;

  return (
    <motion.div 
      className={
        isMobileView
          ? "fixed top-2 left-2 z-[100] w-24 h-24 pointer-events-none"
          : "fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
      }
      style={
        isMobileView 
          ? { scale: 1, opacity: 1, pointerEvents: "auto" }
          : { scale, opacity, pointerEvents: pointerEvents as any }
      }
    >
      <div className="w-full h-full absolute inset-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} />
          <Environment preset="city" />
          <Model isMobile={isMobileView} />
        </Canvas>
      </div>
    </motion.div>
  );
}

// Preload the model
useGLTF.preload("/assets/logo/3D_NMD_LOGO.glb");
