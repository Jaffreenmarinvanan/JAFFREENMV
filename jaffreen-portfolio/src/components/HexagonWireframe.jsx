import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const WireframeSphere = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.x += delta * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      {/* Radius 2.2, Detail 2 creates the perfect geodesic sphere shape */}
      <icosahedronGeometry args={[2.2, 2]} />
      <meshBasicMaterial
        color="#7c3aed"
        wireframe={true}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

const HexagonWireframe = () => {
  return (
    <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <WireframeSphere />
      </Canvas>
    </div>
  );
};

export default HexagonWireframe;
