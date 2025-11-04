"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useState, useEffect } from 'react';
import Garage from './Garage';
import Leo from './Leo';
import F1Car from './F1Car';
import Racetrack from './Racetrack';
import Lighting from './Lighting';

export default function Scene() {
  const [phase, setPhase] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 3000);
    const timer2 = setTimeout(() => setPhase(2), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const startAudio = () => {
    if (!audioPlaying) {
      setAudioPlaying(true);
    }
  };

  return (
    <div className="w-full h-screen" onClick={startAudio}>
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          position={phase === 0 ? [8, 5, 12] : phase === 1 ? [5, 4, 8] : [20, 8, 30]}
          fov={50}
        />

        <Lighting phase={phase} />

        <Environment preset="sunset" />

        {phase < 2 && <Garage phase={phase} />}
        {phase < 2 && <Leo phase={phase} />}

        <F1Car phase={phase} />

        {phase >= 2 && <Racetrack />}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>

      {audioPlaying && (
        <audio autoPlay loop>
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==" type="audio/wav" />
        </audio>
      )}

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg fade-in" style={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Leo's F1 Dream
        </h1>
        {phase === 0 && (
          <p className="mt-4 text-xl text-white/90 drop-shadow fade-in" style={{
            textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
          }}>
            In his garage, a young boy dreams...
          </p>
        )}
        {phase === 2 && (
          <p className="mt-4 text-xl text-white/90 drop-shadow fade-in" style={{
            textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
          }}>
            ...of racing glory
          </p>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center pointer-events-none">
        <p className="text-sm text-white/70 drop-shadow" style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
        }}>
          Click and drag to explore • Scroll to zoom
        </p>
      </div>
    </div>
  );
}
