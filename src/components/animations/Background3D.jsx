// src/components/animations/Background3D.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';

const FloatingCube = () => {
  const mesh = React.useRef();

  useFrame((state) => {
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
    mesh.current.rotation.y = Math.cos(state.clock.getElapsedTime()) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const Background3D = () => {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0}
        fade
      />
      <FloatingCube />
    </Canvas>
  );
};

export default Background3D;