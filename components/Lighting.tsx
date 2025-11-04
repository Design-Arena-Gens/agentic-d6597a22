import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Lighting({ phase }: { phase: number }) {
  const sunRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    if (sunRef.current && phase < 2) {
      const t = clock.getElapsedTime();
      sunRef.current.position.x = Math.sin(t * 0.1) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={phase < 2 ? 0.4 : 0.6} />

      <directionalLight
        ref={sunRef}
        position={phase < 2 ? [10, 15, 8] : [20, 30, 15]}
        intensity={phase < 2 ? 1.2 : 1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        color={phase < 2 ? "#fff5e6" : "#ffffff"}
      />

      <hemisphereLight
        intensity={0.5}
        color="#87CEEB"
        groundColor="#8B7355"
      />

      {phase >= 2 && (
        <>
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
          <spotLight
            position={[15, 20, 10]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
          />
        </>
      )}
    </>
  );
}
