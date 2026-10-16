import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Central interactive 3D focal object
function CinematicOrb({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);
  const ring3Ref = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const targetX = mousePosition.current.x * 0.8;
    const targetY = mousePosition.current.y * 0.8;

    // Smooth lerp for main mesh rotation influenced by pointer
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25 + (targetY * 0.5 - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += delta * 0.35 + (targetX * 0.5 - meshRef.current.rotation.y) * 0.05;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.3;
      innerRef.current.rotation.z += delta * 0.2;
    }

    // Orbiting rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.15;
      ring1Ref.current.rotation.y += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.2;
      ring2Ref.current.rotation.z += delta * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.18;
      ring3Ref.current.rotation.z -= delta * 0.12;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Main central morphing sphere */}
        <mesh ref={meshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 12]} />
          <MeshDistortMaterial
            color="#080e1a"
            emissive="#005577"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.9}
            distort={0.35}
            speed={1.5}
            wireframe={false}
          />
        </mesh>

        {/* Outer wireframe lattice */}
        <mesh scale={2.05}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#00d2ff"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Luminous Core */}
        <mesh ref={innerRef} scale={0.9}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#00d2ff"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.8}
            wireframe
          />
        </mesh>

        {/* Orbiting Ring 1 */}
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[2.7, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#00d2ff"
              emissive="#00d2ff"
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </group>

        {/* Orbiting Ring 2 */}
        <group ref={ring2Ref}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[3.2, 0.015, 16, 100]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.6}
              roughness={0.3}
              metalness={0.9}
            />
          </mesh>
        </group>

        {/* Orbiting Ring 3 with subtle dashed markers */}
        <group ref={ring3Ref}>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[3.7, 0.012, 16, 80]} />
            <meshStandardMaterial
              color="#818cf8"
              emissive="#6366f1"
              emissiveIntensity={0.5}
              roughness={0.4}
              metalness={0.9}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// Particle field
function Starfield({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00d2ff');
    const blue = new THREE.Color('#3b82f6');
    const white = new THREE.Color('#f8fafc');

    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(3.5, 9);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mixed = Math.random() > 0.6 ? cyan : (Math.random() > 0.5 ? blue : white);
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Check WebGL support helper
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

// Fallback CSS animation in case WebGL is disabled or unsupported
function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin" style={{ animationDuration: '24s' }} />
        <div className="absolute inset-4 rounded-full border border-blue-500/20 border-dashed animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
        {/* Core sphere */}
        <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-600/30 via-blue-900/50 to-slate-900 border border-cyan-400/50 shadow-glow-lg animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center text-xs text-cyan-400/70 font-mono tracking-widest uppercase">
          Digital Matrix Core
        </div>
      </div>
    </div>
  );
}

interface ThreeHeroSceneProps {
  className?: string;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ className = "" }) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePosition.current = { x, y };
  };

  if (!hasWebGL || hasError) {
    return (
      <div className={`w-full h-full ${className}`}>
        <SceneFallback />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}
      onPointerMove={handlePointerMove}
      aria-label="Interactive 3D Geometric Focal Core"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.4} />
        {/* Electric blue key light */}
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#00d2ff" />
        {/* Subtle indigo fill light */}
        <directionalLight position={[-5, -4, -2]} intensity={1.2} color="#4338ca" />
        {/* Top white rim light */}
        <pointLight position={[0, 6, 2]} intensity={1.5} color="#ffffff" distance={12} />
        
        <CinematicOrb mousePosition={mousePosition} />
        <Starfield count={150} />
      </Canvas>
      
      {/* Interactive Hint */}
      <div className="absolute bottom-2 right-4 text-[11px] font-mono tracking-wider text-slate-500 uppercase pointer-events-none select-none flex items-center gap-1.5 opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        Interactive 3D Matrix
      </div>
    </div>
  );
};

export default ThreeHeroScene;
