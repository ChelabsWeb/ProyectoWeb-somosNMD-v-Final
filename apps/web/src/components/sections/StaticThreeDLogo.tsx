"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function StaticModel() {
  const { scene } = useGLTF("/assets/logo/3D_NMD_LOGO.glb");
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // Set to look straight ahead
      modelRef.current.rotation.x = Math.PI / 2;
      modelRef.current.rotation.y = 0;
      modelRef.current.rotation.z = 0;
      
      // Floating animation only
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Apply a clean metallic silver material
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "#E0E0E0", 
        roughness: 0.1,   
        metalness: 1.0,   
        envMapIntensity: 2.0, 
      });
    }
  });

  return <primitive object={scene} ref={modelRef} scale={5.5} />;
}

export function StaticThreeDLogo() {
  return (
    <div className="w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] aspect-square mx-auto mix-blend-multiply opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="city" />
        <StaticModel />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/assets/logo/3D_NMD_LOGO.glb");
