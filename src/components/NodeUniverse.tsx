import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { companies } from '../data/companies';
import { layers } from '../data/layers';
import { useAppStore } from '../store/useAppStore';

const ParticleCloud = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mode = useAppStore((state) => state.mode);
  const positions = useMemo(() => {
    const source = [...layers, ...companies.slice(0, 95)];
    const array = new Float32Array(source.length * 3);
    source.forEach((item, index) => {
      const layerIndex = 'order' in item ? item.order : layers.find((layer) => item.aiBusiness.layerIds.includes(layer.id))?.order ?? index;
      const angle = index * 2.399963;
      const radius = mode === 'china' ? 5.4 : 6.2;
      array[index * 3] = Math.cos(angle) * radius * (0.38 + (index % 9) / 18);
      array[index * 3 + 1] = 4.6 - layerIndex * 0.62 + Math.sin(index) * 0.35;
      array[index * 3 + 2] = Math.sin(angle) * radius * (0.38 + (index % 7) / 20);
    });
    return array;
  }, [mode]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.025;
    pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={mode === 'china' ? '#93c5fd' : '#22d3ee'} size={0.045} transparent opacity={0.62} sizeAttenuation />
    </points>
  );
};

export const NodeUniverse = () => (
  <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
    <Canvas
      camera={{ position: [0, 0, 9], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <fog attach="fog" args={['#030712', 8, 18]} />
      <ParticleCloud />
    </Canvas>
  </div>
);
