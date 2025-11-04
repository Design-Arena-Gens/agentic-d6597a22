import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Leo({ phase }: { phase: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (rightArmRef.current && phase === 0) {
      rightArmRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 2) * 0.3 - 0.3;
    }

    if (groupRef.current && phase >= 1) {
      groupRef.current.position.y -= 0.05;
      if (groupRef.current.position.y < -20) {
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 2]}>
      {/* Body */}
      <mesh castShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 1, 16]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 2.4, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#FFD4A3" />
      </mesh>

      {/* Hair */}
      <mesh castShadow position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.36, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#4B3621" />
      </mesh>

      {/* Eyes */}
      <mesh castShadow position={[-0.1, 2.45, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh castShadow position={[0.1, 2.45, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 2.3, 0.33]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Left arm */}
      <group position={[-0.5, 1.6, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial color="#FFD4A3" />
        </mesh>
      </group>

      {/* Right arm (holding car) */}
      <group ref={rightArmRef} position={[0.5, 1.6, 0]}>
        <mesh castShadow rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial color="#FFD4A3" />
        </mesh>
      </group>

      {/* Left leg */}
      <mesh castShadow position={[-0.15, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Right leg */}
      <mesh castShadow position={[0.15, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Shoes */}
      <mesh castShadow position={[-0.15, 0.05, 0.1]}>
        <boxGeometry args={[0.15, 0.1, 0.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh castShadow position={[0.15, 0.05, 0.1]}>
        <boxGeometry args={[0.15, 0.1, 0.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}
