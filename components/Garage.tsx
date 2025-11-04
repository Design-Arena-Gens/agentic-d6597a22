import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Garage({ phase }: { phase: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && phase >= 1) {
      groupRef.current.position.y -= 0.05;
      if (groupRef.current.position.y < -20) {
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.8} />
      </mesh>

      {/* Back wall */}
      <mesh receiveShadow position={[0, 5, -8]}>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color="#6b6b6b" />
      </mesh>

      {/* Left wall */}
      <mesh receiveShadow position={[-10, 5, 0]}>
        <boxGeometry args={[0.5, 10, 16]} />
        <meshStandardMaterial color="#6b6b6b" />
      </mesh>

      {/* Right wall with opening for light */}
      <mesh receiveShadow position={[10, 5, 0]}>
        <boxGeometry args={[0.5, 10, 16]} />
        <meshStandardMaterial color="#6b6b6b" />
      </mesh>

      {/* Garage door (partially open) */}
      <mesh receiveShadow position={[0, 2, 8]}>
        <boxGeometry args={[12, 4, 0.3]} />
        <meshStandardMaterial color="#8b7355" metalness={0.3} />
      </mesh>

      {/* Workbench */}
      <group position={[-6, 0, -6]}>
        <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh castShadow position={[-1, 0.75, -0.5]}>
          <boxGeometry args={[0.2, 1.5, 0.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh castShadow position={[1, 0.75, -0.5]}>
          <boxGeometry args={[0.2, 1.5, 0.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>

      {/* Shelves */}
      <group position={[6, 3, -7.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4, 0.1, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
          <boxGeometry args={[4, 0.1, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* Tool boxes on shelf */}
      <mesh castShadow position={[5, 3.5, -7.5]}>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#cc0000" metalness={0.6} />
      </mesh>
      <mesh castShadow position={[6.5, 3.5, -7.5]}>
        <boxGeometry args={[0.4, 0.25, 0.3]} />
        <meshStandardMaterial color="#0066cc" metalness={0.6} />
      </mesh>
    </group>
  );
}
