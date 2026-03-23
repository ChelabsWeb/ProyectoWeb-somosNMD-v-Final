"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/use-media-query";

function Model() {
  const { scene } = useGLTF("/assets/logo/3D_NMD_LOGO.glb");
  const modelRef = useRef<THREE.Group>(null);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E0E0E0",
        roughness: 0.1,
        metalness: 1.0,
        envMapIntensity: 2.0,
      }),
    []
  );

  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
  }, [scene, material]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = Math.PI / 2;
      modelRef.current.rotation.y = 0;
      modelRef.current.rotation.z = 0;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={2.2} />;
}

export function ThreeDLogoViewer() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) return null;

  return (
    <div className="fixed top-4 left-4 z-[45] w-[80px] h-[80px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="city" />
        <Model />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/logo/3D_NMD_LOGO.glb");
