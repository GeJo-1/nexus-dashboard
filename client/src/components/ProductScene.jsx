import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Standard 3D Component (No external libraries like 'drei')
function CyberShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    // Rotate the shape
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      {/* Octahedron looks more "tech" than a sphere */}
      <octahedronGeometry args={[1, 0]} /> 
      {/* Wireframe gives it that Holographic/Blueprint look */}
      <meshStandardMaterial color="#00f3ff" wireframe={true} />
    </mesh>
  );
}

export default function ProductScene() {
  return (
    <div className="h-[300px] w-full bg-glass rounded-xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10 font-bold text-neon">LIVE PRODUCT PREVIEW</div>
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <CyberShape />
        </Canvas>
    </div>
  );
}