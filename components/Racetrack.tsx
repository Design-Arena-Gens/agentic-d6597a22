import * as THREE from 'three';

export default function Racetrack() {
  return (
    <group>
      {/* Track surface */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[10, 18, 64]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Inner grass */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#2d5016" roughness={1} />
      </mesh>

      {/* Outer grass */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[30, 64]} />
        <meshStandardMaterial color="#3a6b1f" roughness={1} />
      </mesh>

      {/* White track lines */}
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i / 32) * Math.PI * 2;
        const radius = 14;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, angle]}>
            <planeGeometry args={[1, 0.3]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        );
      })}

      {/* Starting line */}
      <mesh position={[14, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[13, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Grandstand structure */}
      <group position={[0, 0, -25]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[30, 8, 3]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Seats */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, i * 1.5 - 2, 1.5]} castShadow>
            <boxGeometry args={[28, 0.8, 1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#0066cc" : "#cc0000"}
              roughness={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Pit buildings */}
      <group position={[-25, 0, 0]}>
        <mesh castShadow receiveShadow position={[0, 2.5, 0]}>
          <boxGeometry args={[5, 5, 15]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, 5.5, 0]}>
          <boxGeometry args={[5.2, 0.5, 15.2]} />
          <meshStandardMaterial color="#cc0000" roughness={0.4} />
        </mesh>
      </group>

      {/* Barrier walls */}
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i / 48) * Math.PI * 2;
        const radius = 18.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={`outer-${i}`} position={[x, 0.5, z]} rotation={[0, angle + Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[2, 1, 0.3]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff0000" : "#ffffff"}
              roughness={0.6}
            />
          </mesh>
        );
      })}

      {/* Trees in background */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 35 + Math.random() * 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 4 + Math.random() * 3;
        return (
          <group key={`tree-${i}`} position={[x, 0, z]}>
            {/* Trunk */}
            <mesh castShadow position={[0, height / 3, 0]}>
              <cylinderGeometry args={[0.3, 0.4, height / 1.5, 8]} />
              <meshStandardMaterial color="#4a3828" />
            </mesh>
            {/* Foliage */}
            <mesh castShadow position={[0, height, 0]}>
              <sphereGeometry args={[2, 8, 8]} />
              <meshStandardMaterial color="#2d5016" />
            </mesh>
          </group>
        );
      })}

      {/* Sky dome */}
      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <meshStandardMaterial
          color="#87CEEB"
          side={THREE.BackSide}
          roughness={1}
        />
      </mesh>
    </group>
  );
}
