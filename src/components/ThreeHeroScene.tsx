import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Interactive 3D Cybernetic Energy Sphere
function CyberneticGlobe({
  mousePosition,
  isDragging,
  dragRotation,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isDragging: React.MutableRefObject<boolean>;
  dragRotation: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const globeGroupRef = useRef<THREE.Group>(null!);
  const innerEnergyCoreRef = useRef<THREE.Mesh>(null!);
  const atmosphericGlowRef = useRef<THREE.Mesh>(null!);
  const geodesicWireframeRef = useRef<THREE.Mesh>(null!);
  const latLongWireframeRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);
  const ring3Ref = useRef<THREE.Group>(null!);
  const ring4Ref = useRef<THREE.Group>(null!);
  const surfacePointsRef = useRef<THREE.Points>(null!);
  const coreLightRef = useRef<THREE.PointLight>(null!);

  // Generate glowing data points on the globe surface
  const { nodePositions, nodeColors } = useMemo(() => {
    const count = 620;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radius = 2.02;

    const cyan = new THREE.Color('#00f5ff');
    const skyBlue = new THREE.Color('#38bdf8');
    const neonWhite = new THREE.Color('#f0f9ff');
    const electricViolet = new THREE.Color('#818cf8');

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution for uniform sphere surface distribution
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
      let col = cyan;
      if (rand > 0.7) col = neonWhite;
      else if (rand > 0.4) col = skyBlue;
      else if (rand > 0.25) col = electricViolet;

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return { nodePositions: positions, nodeColors: colors };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Mouse tilt targeting
    const targetMouseX = mousePosition.current.x * 0.75;
    const targetMouseY = mousePosition.current.y * 0.75;

    if (globeGroupRef.current) {
      if (!isDragging.current) {
        // Continuous smooth auto-rotation + damped mouse reaction
        dragRotation.current.y += delta * 0.28;
      }
      globeGroupRef.current.rotation.y = dragRotation.current.y + targetMouseX * 0.35;
      globeGroupRef.current.rotation.x = dragRotation.current.x + targetMouseY * 0.25;
    }

    // Dynamic core pulsation
    if (innerEnergyCoreRef.current) {
      const pulse = 1 + Math.sin(time * 2.8) * 0.04;
      innerEnergyCoreRef.current.scale.set(1.92 * pulse, 1.92 * pulse, 1.92 * pulse);
      innerEnergyCoreRef.current.rotation.y -= delta * 0.22;
      innerEnergyCoreRef.current.rotation.z += delta * 0.1;
    }

    // Volumetric glow breathing
    if (atmosphericGlowRef.current) {
      const breath = 1 + Math.cos(time * 2.2) * 0.05;
      atmosphericGlowRef.current.scale.set(2.18 * breath, 2.18 * breath, 2.18 * breath);
    }

    // Geodesic shell counter-rotation
    if (geodesicWireframeRef.current) {
      geodesicWireframeRef.current.rotation.y += delta * 0.2;
      geodesicWireframeRef.current.rotation.x -= delta * 0.08;
    }

    // Lat-long grid spin
    if (latLongWireframeRef.current) {
      latLongWireframeRef.current.rotation.y -= delta * 0.16;
    }

    // Surface data nodes pulse
    if (surfacePointsRef.current) {
      surfacePointsRef.current.rotation.y += delta * 0.14;
    }

    // Internal light fluctuation
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 3.5 + Math.sin(time * 3.5) * 1.2;
    }

    // Multi-angle orbital gyroscopic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.45;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.38;
      ring2Ref.current.rotation.z += delta * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.3;
      ring3Ref.current.rotation.y += delta * 0.25;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.z -= delta * 0.2;
      ring4Ref.current.rotation.x -= delta * 0.18;
    }
  });

  return (
    <group ref={globeGroupRef}>
      <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.7}>
        
        {/* Internal Radiant Point Light illuminating rings and shell from within */}
        <pointLight
          ref={coreLightRef}
          position={[0, 0, 0]}
          color="#00f5ff"
          intensity={4.2}
          distance={10}
        />

        {/* 1. Luminous Plasma Energy Core */}
        <mesh ref={innerEnergyCoreRef} scale={1.92}>
          <sphereGeometry args={[1, 36, 36]} />
          <meshStandardMaterial
            color="#012b4d"
            emissive="#0099ff"
            emissiveIntensity={2.4}
            roughness={0.15}
            metalness={0.7}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* 2. Atmospheric Fresnel Halo Glow */}
        <mesh ref={atmosphericGlowRef} scale={2.18}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.28}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* 3. High-Contrast Geodesic Icosahedron Lattice */}
        <mesh ref={geodesicWireframeRef} scale={2.08}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#00f5ff"
            wireframe
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 4. Latitude-Longitude Spherical Grid Wireframe */}
        <mesh ref={latLongWireframeRef} scale={2.04}>
          <sphereGeometry args={[1, 28, 20]} />
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 5. Dense Surface Data Nodes (Points) */}
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
            size={0.075}
            vertexColors
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>

        {/* 6. Orbital Ring 1 (Electric Cyan Torus with Quantum Satellite) */}
        <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.72, 0.022, 16, 120]} />
            <meshStandardMaterial
              color="#00f5ff"
              emissive="#00f5ff"
              emissiveIntensity={2.2}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Orbiting Quantum Satellite 1 */}
          <mesh position={[2.72, 0, 0]} scale={0.09}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00f5ff"
              emissiveIntensity={3.5}
            />
          </mesh>
          <mesh position={[-2.72, 0, 0]} scale={0.06}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* 7. Orbital Ring 2 (Tilted Polar Ring with Energy Beads) */}
        <group ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 5, 0]}>
          <mesh>
            <torusGeometry args={[3.12, 0.018, 16, 120]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
          {/* Satellite Beacon */}
          <mesh position={[0, 3.12, 0]} scale={0.08}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00f5ff"
              emissiveIntensity={4}
            />
          </mesh>
        </group>

        {/* 8. Orbital Ring 3 (Outer Gyro Gimbal Ring) */}
        <group ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 3, 0]}>
          <mesh>
            <torusGeometry args={[3.55, 0.015, 16, 100]} />
            <meshStandardMaterial
              color="#818cf8"
              emissive="#6366f1"
              emissiveIntensity={1.6}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
          <mesh position={[3.55, 0, 0]} scale={0.065}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#c7d2fe"
              emissive="#818cf8"
              emissiveIntensity={2.8}
            />
          </mesh>
        </group>

        {/* 9. Orbital Ring 4 (Equatorial Whispering Halo) */}
        <group ref={ring4Ref} rotation={[0.1, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.45, 0.012, 16, 90]} />
            <meshBasicMaterial
              color="#00f5ff"
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

      </Float>
    </group>
  );
}

// Surrounding Ambient Cosmic Particle Cloud
function AmbientParticles({ count = 240 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00f5ff');
    const blue = new THREE.Color('#38bdf8');
    const white = new THREE.Color('#ffffff');
    const violet = new THREE.Color('#a5b4fc');

    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(2.8, 8.8);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const rand = Math.random();
      const mixed = rand > 0.6 ? cyan : (rand > 0.3 ? blue : (rand > 0.15 ? white : violet));
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
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
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
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Outer Orbit */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-spin" style={{ animationDuration: '24s' }} />
        <div className="absolute inset-6 rounded-full border border-blue-400/35 border-dashed animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
        <div className="absolute inset-12 rounded-full border border-indigo-400/30 animate-spin" style={{ animationDuration: '30s' }} />
        {/* Globe Body with Glowing Gradient */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-900 to-indigo-950 border-2 border-cyan-300 shadow-[0_0_60px_rgba(0,210,255,0.6)] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-subtle-grid opacity-40 animate-pulse-slow" />
          <div className="w-4 h-4 rounded-full bg-cyan-300 animate-ping shadow-[0_0_15px_#00d2ff]" />
        </div>
        <div className="absolute -bottom-6 text-xs text-cyan-300 font-mono tracking-widest uppercase bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
          Cybernetic Energy Sphere
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
  const isDragging = useRef<boolean>(false);
  const dragRotation = useRef({ x: 0, y: 0 });
  const previousPointerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setHasWebGL(gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    previousPointerPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePosition.current = { x, y };

    if (isDragging.current) {
      const deltaX = e.clientX - previousPointerPos.current.x;
      const deltaY = e.clientY - previousPointerPos.current.y;
      dragRotation.current.y += deltaX * 0.008;
      dragRotation.current.x += deltaY * 0.008;
      previousPointerPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-label="Interactive 3D Cybernetic Energy Sphere"
    >
      <Canvas
        camera={{ position: [0, 0, 6.0], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.9} color="#0b1728" />
        {/* Electric cyan key light */}
        <directionalLight position={[6, 6, 6]} intensity={3.2} color="#00f5ff" />
        {/* Deep blue fill light */}
        <directionalLight position={[-6, -5, -3]} intensity={2.4} color="#1d4ed8" />
        {/* White rim light */}
        <pointLight position={[0, 7, 3]} intensity={3.0} color="#ffffff" distance={15} />
        {/* Violet depth accent light */}
        <pointLight position={[-4, 3, -4]} intensity={2.0} color="#818cf8" distance={12} />
        
        <CyberneticGlobe
          mousePosition={mousePosition}
          isDragging={isDragging}
          dragRotation={dragRotation}
        />
        <AmbientParticles count={240} />
      </Canvas>
      
      {/* Interactive Mode Badge */}
      <div className="absolute bottom-4 right-4 text-[10px] font-mono tracking-wider text-cyan-300 uppercase pointer-events-none select-none flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>3D Interactive • Drag To Rotate</span>
      </div>
    </div>
  );
};

export default ThreeHeroScene;
