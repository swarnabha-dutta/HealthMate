'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function DeskModelMesh() {
  const desk = useGLTF('/models/desk.glb'); // 👈 Replace with your actual path
  return <primitive object={desk.scene} scale={1.5} position={[0, -1, 0]} />;
}

export default function DeskModel() {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <DeskModelMesh />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}
