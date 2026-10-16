import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Interactive 3D Cybernetic Globe Component
function CyberneticGlobe({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) {
  const globeGroupRef = useRef<THREE.Group>(null!);
  const innerSphereRef = useRef<THREE.Mesh>(null!);
  const wireframeSphereRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);
  const ring3Ref = useRef<THREE.Group>(null!);
  const surfacePointsRef = useRef<THREE.Points>(null!);

  // Generate glowing data points on the globe surface (representing nodes)
  const { nodePositions, nodeColors } = useMemo(() => {
    const count = 450;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radius = 2.0;

    const cyan = new THREE.Color('#00d2ff');
    const blue = new THREE.Color('#38bdf8');
    const white = new THREE.Color('#f8fafc');

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution for uniform sphere surface points
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation
      const rand = Math.random();
      const col = rand > 0.6 ? cyan : (rand > 0.3 ? blue : white);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return { nodePositions: positions, nodeColors: colors };
  }, []);

  useFrame((state, delta) => {
    const targetX = mousePosition.current.x * 0.7;
    const targetY = mousePosition.current.y * 0.7;

    if (globeGroupRef.current) {
      // Gentle continuous rotation + smooth mouse tilt response
      globeGroupRef.current.rotation.y += delta * 0.2 + (targetX * 0.4 - globeGroupRef.current.rotation.y * 0.05) * 0.08;
      globeGroupRef.current.rotation.x += (targetY * 0.3 - globeGroupRef.current.rotation.x) * 0.05;
    }

    // Inner core counter-rotation
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y -= delta * 0.15;
    }

    // Surface wireframe spin
    if (wireframeSphereRef.current) {
      wireframeSphereRef.current.rotation.y += delta * 0.18;
    }

    // Orbiting rings at distinct angles and speeds
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35;
      ring1Ref.current.rotation.x += delta * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.28;
      ring2Ref.current.rotation.z += delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.22;
      ring3Ref.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={globeGroupRef}>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
        
        {/* 1. Dark Translucent Core Sphere */}
        <mesh ref={innerSphereRef} scale={1.96}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#040711"
            emissive="#021427"
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.9}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* 2. Geodesic / Latitude-Longitude Wireframe Grid */}
        <mesh ref={wireframeSphereRef} scale={2.0}>
          <sphereGeometry args={[1, 24, 18]} />
          <meshBasicMaterial
            color="#00d2ff"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>

        {/* 3. Outer Geodesic Icosahedron Shield */}
        <mesh scale={2.08}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* 4. Globe Surface Data Nodes (Points) */}
        <points ref={surfacePointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={nodePositions.length / 3}
              array={nodePositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={nodeColors.length / 3}
              array={nodeColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            vertexColors
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>

        {/* 5. Orbital Ring 1 with Satellite Marker */}
        <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.75, 0.015, 16, 120]} />
            <meshStandardMaterial
              color="#00d2ff"
              emissive="#00d2ff"
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
          {/* Orbiting Satellite Data Bead */}
          <mesh position={[2.75, 0, 0]} scale={0.07}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00d2ff"
              emissiveIntensity={2}
            />
          </mesh>
        </group>

        {/* 6. Orbital Ring 2 (Equatorial / Tilted) */}
        <group ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <mesh>
            <torusGeometry args={[3.15, 0.012, 16, 120]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.6}
              roughness={0.3}
              metalness={0.9}
            />
          </mesh>
          {/* Secondary Satellite Marker */}
          <mesh position={[-3.15, 0, 0]} scale={0.06}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#38bdf8"
              emissiveIntensity={2}
            />
          </mesh>
        </group>

        {/* 7. Orbital Ring 3 (Outer Celestial Boundary) */}
        <group ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
          <mesh>
            <torusGeometry args={[3.6, 0.01, 16, 100]} />
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

// Surrounding Celestial Particle Cloud
function AmbientParticles({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00d2ff');
    const blue = new THREE.Color('#2563eb');
    const silver = new THREE.Color('#e2e8f0');

    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(3.2, 8.5);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const rand = Math.random();
      const mixed = rand > 0.6 ? cyan : (rand > 0.3 ? blue : silver);
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
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
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Fallback CSS animation in case WebGL is disabled or unsupported
function GlobeFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Outer Orbit */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin" style={{ animationDuration: '28s' }} />
        <div className="absolute inset-6 rounded-full border border-blue-500/25 border-dashed animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
        {/* Globe Body */}
        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-blue-900 border border-cyan-400/40 shadow-glow-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-subtle-grid opacity-30" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
        <div className="absolute -bottom-4 text-[11px] text-cyan-400/80 font-mono tracking-widest uppercase">
          Cybernetic Globe
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
    try {
      const canvas = document.createElement('canvas');
      const gl = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setHasWebGL(gl);
    } catch {
      setHasWebGL(false);
    }
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
        <GlobeFallback />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full relative cursor-grab active:cursor-grabbing select-none ${className}`}
      onPointerMove={handlePointerMove}
      aria-label="Interactive 3D Cybernetic Globe"
    >
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.4} />
        {/* Electric cyan key light */}
        <directionalLight position={[6, 5, 5]} intensity={2.0} color="#00d2ff" />
        {/* Blue fill light */}
        <directionalLight position={[-6, -4, -3]} intensity={1.4} color="#1d4ed8" />
        {/* White rim light */}
        <pointLight position={[0, 6, 2]} intensity={1.8} color="#ffffff" distance={14} />
        
        <CyberneticGlobe mousePosition={mousePosition} />
        <AmbientParticles count={160} />
      </Canvas>
      
      {/* Interactive Mode Badge */}
      <div className="absolute bottom-3 right-4 text-[10px] font-mono tracking-wider text-slate-400 uppercase pointer-events-none select-none flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        Interactive 3D Globe
      </div>
    </div>
  );
};

export default ThreeHeroScene;
