"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Liquid chrome sphere — reactive metalized sphere with magenta caustics    */
/* -------------------------------------------------------------------------- */

function LiquidChrome() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = state.pointer.x;
    const my = state.pointer.y;

    if (groupRef.current) {
      // Cursor parallax rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mx * 0.45 + Math.sin(t * 0.18) * 0.08,
        0.05,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -my * 0.3 + Math.cos(t * 0.22) * 0.06,
        0.05,
      );
      // Breathing scale
      const breath = 1 + Math.sin(t * 0.5) * 0.025;
      groupRef.current.scale.setScalar(breath);
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.18;
      sphereRef.current.rotation.x = Math.sin(t * 0.3) * 0.4;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4;
      innerRef.current.rotation.z = t * 0.25;
    }

    if (matRef.current) {
      // Pulse distortion intensity
      matRef.current.distort = 0.38 + Math.sin(t * 0.9) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[2.4, 0.2, 0]}>
      {/* Outer liquid chrome */}
      <mesh ref={sphereRef} castShadow>
        <icosahedronGeometry args={[1.55, 64]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#1a1a1f"
          metalness={1}
          roughness={0.08}
          distort={0.4}
          speed={1.6}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Inner magenta glow core (visible through the chrome rim) */}
      <mesh ref={innerRef} scale={0.72}>
        <icosahedronGeometry args={[1, 24]} />
        <meshBasicMaterial
          color="#ff2d8d"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Magenta glow halo */}
      <mesh scale={1.85}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ff2d8d"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Particle field — magenta dust drifting through space                      */
/* -------------------------------------------------------------------------- */

function ParticleDust({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 0.05 + 0.015;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = Math.sin(t * 0.18) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={sizes.length} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff2d8d"
        size={0.045}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WhiteDust({ count = 350 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.025}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reactive lighting — magenta key + secondary fill orbit the sphere         */
/* -------------------------------------------------------------------------- */

function ReactiveLights() {
  const keyRef = useRef<THREE.PointLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (keyRef.current) {
      keyRef.current.position.x = state.pointer.x * 5 + 3;
      keyRef.current.position.y = state.pointer.y * 3 + 2;
      keyRef.current.position.z = 3 + Math.sin(t * 0.6) * 1.2;
    }
    if (fillRef.current) {
      fillRef.current.position.x = Math.cos(t * 0.4) * 4;
      fillRef.current.position.y = Math.sin(t * 0.5) * 2;
      fillRef.current.position.z = -3 + Math.cos(t * 0.4) * 1.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 6, 4]} intensity={0.4} color="#ffffff" />
      <pointLight ref={keyRef} position={[3, 2, 4]} intensity={42} color="#ff2d8d" distance={16} decay={1.6} />
      <pointLight ref={fillRef} position={[-4, -2, -3]} intensity={18} color="#ff7ab8" distance={12} decay={2} />
      <pointLight position={[0, -3, 6]} intensity={6} color="#5b1f3a" distance={10} decay={2} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Camera rig — slow push-in + cursor parallax                               */
/* -------------------------------------------------------------------------- */

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const tx = state.pointer.x * 0.5;
    const ty = state.pointer.y * 0.35;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.04);
    camera.lookAt(2.4, 0.2, 0);
  });
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Public component                                                          */
/* -------------------------------------------------------------------------- */

export function MomentumScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 38, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ReactiveLights />
        <CameraRig />
        <LiquidChrome />
        <ParticleDust count={900} />
        <WhiteDust count={350} />
      </Suspense>
    </Canvas>
  );
}
