import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function F1Car({ phase }: { phase: number }) {
  const carRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  useFrame(({ clock }) => {
    if (!carRef.current) return;

    const t = clock.getElapsedTime();

    if (phase === 0) {
      // Toy car in Leo's hand
      carRef.current.position.set(2.8, 2.2, 2.5);
      carRef.current.rotation.set(-0.2, 0.3 + Math.sin(t * 2) * 0.1, 0.1);
      carRef.current.scale.setScalar(0.3);
    } else if (phase === 1) {
      // Transitioning
      const progress = Math.min((t - 3) / 2, 1);
      carRef.current.position.set(
        2.8 + progress * -2.8,
        2.2 + progress * 0.3,
        2.5 + progress * 2.5
      );
      carRef.current.scale.setScalar(0.3 + progress * 1.7);
      carRef.current.rotation.y = 0.3 + progress * -0.3;
    } else {
      // Full-size on racetrack
      carRef.current.position.set(
        Math.sin(t * 0.5) * 12,
        0.5,
        Math.cos(t * 0.5) * 12
      );
      carRef.current.rotation.y = Math.PI / 2 + t * 0.5;
      carRef.current.scale.setScalar(2);

      // Rotate wheels
      wheelsRef.current.forEach(wheel => {
        if (wheel) wheel.rotation.x += 0.2;
      });
    }
  });

  return (
    <group ref={carRef}>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[2, 0.4, 1]} />
        <meshStandardMaterial
          color="#CC0000"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Cockpit */}
      <mesh castShadow position={[0.2, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.8]} />
        <meshStandardMaterial
          color="#CC0000"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Windscreen */}
      <mesh castShadow position={[0.5, 0.4, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.3, 0.25, 0.7]} />
        <meshStandardMaterial
          color="#001f3f"
          transparent
          opacity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Front wing */}
      <mesh castShadow position={[1.2, -0.1, 0]}>
        <boxGeometry args={[0.3, 0.05, 1.4]} />
        <meshStandardMaterial color="#000000" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Rear wing */}
      <mesh castShadow position={[-1, 0.5, 0]}>
        <boxGeometry args={[0.2, 0.05, 1.4]} />
        <meshStandardMaterial color="#000000" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[-0.9, 0.25, 0.6]}>
        <boxGeometry args={[0.05, 0.5, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh castShadow position={[-0.9, 0.25, -0.6]}>
        <boxGeometry args={[0.05, 0.5, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Engine cover */}
      <mesh castShadow position={[-0.5, 0.25, 0]}>
        <boxGeometry args={[1, 0.3, 0.9]} />
        <meshStandardMaterial color="#CC0000" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <group position={[0.7, -0.25, 0.6]} ref={el => { if (el) wheelsRef.current[0] = el; }}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      <group position={[0.7, -0.25, -0.6]} ref={el => { if (el) wheelsRef.current[1] = el; }}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-0.7, -0.25, 0.6]} ref={el => { if (el) wheelsRef.current[2] = el; }}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-0.7, -0.25, -0.6]} ref={el => { if (el) wheelsRef.current[3] = el; }}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* Number decals */}
      <mesh position={[0.2, 0.5, 0.41]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0.2, 0.5, -0.41]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}
