import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  
  // Create random points
  const points = useMemo(() => {
    const p = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      // Gentle rotation
      ref.current.rotation.y = time * 0.05;
      ref.current.rotation.x = time * 0.02;
      
      // Reactive to mouse
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.5, 0.1);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.5, 0.1);
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function GridPlane() {
  const ref = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.z = (time * 0.5) % 2;
    }
  });

  return (
    <group ref={ref}>
      <gridHelper args={[20, 20, '#8B5CF6', '#2d0050']} rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]} />
      <gridHelper args={[20, 20, '#8B5CF6', '#2d0050']} rotation={[Math.PI / 2, 0, 0]} position={[0, -2, -20]} />
    </group>
  );
}

export const ThreeBackground = () => {
  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, stencil: false, depth: true }}
      >
        <color attach="background" args={['#080112']} />
        <fog attach="fog" args={['#080112', 5, 15]} />
        <ambientLight intensity={0.5} />
        <ParticleField />
        <GridPlane />
      </Canvas>
    </div>
  );
};
