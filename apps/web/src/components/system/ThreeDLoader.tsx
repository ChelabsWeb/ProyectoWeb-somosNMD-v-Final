"use client";

import { Suspense, useRef, type FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const LOGO_MODEL_PATH = "/assets/logo/3D_NMD_LOGO.glb";

type LogoModelProps = {
  prefersReducedMotion: boolean;
};

function LogoModel({ prefersReducedMotion }: LogoModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(LOGO_MODEL_PATH);

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  // Ensure materials are set up correctly for visibility
  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        // Make sure the material is double-sided and has proper lighting
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            mat.side = THREE.DoubleSide;
            mat.needsUpdate = true;
          });
        } else {
          mesh.material.side = THREE.DoubleSide;
          mesh.material.needsUpdate = true;
        }
      }
    }
  });

  // Calculate bounding box and center the model
  const box = new THREE.Box3().setFromObject(clonedScene);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  // Calculate scale to fit the model nicely in view with room for rotation
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 2.0 / maxDim : 1;

  // Center the model
  clonedScene.position.set(-center.x, -center.y, -center.z);

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;

    // 3D rotation - rotate in multiple axes for full 3D effect
    groupRef.current.rotation.x += 0.003;
    groupRef.current.rotation.y += 0.005;
    groupRef.current.rotation.z += 0.002;

    // Gentle breathing scale effect
    const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    groupRef.current.scale.setScalar(scale * breathingScale);
  });

  return (
    <group ref={groupRef} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

type ThreeDLoaderProps = {
  prefersReducedMotion: boolean;
};

export const ThreeDLoader: FC<ThreeDLoaderProps> = ({
  prefersReducedMotion,
}) => {
  return (
    <div className="h-48 w-48 md:h-64 md:w-64">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 4], fov: 50, near: 0.1, far: 1000 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lighting setup - clean and bright */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 0, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 0, -5]} intensity={0.5} color="#ffffff" />

        {/* 3D Logo Model */}
        <Suspense fallback={null}>
          <LogoModel prefersReducedMotion={prefersReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the GLB model
useGLTF.preload(LOGO_MODEL_PATH);
