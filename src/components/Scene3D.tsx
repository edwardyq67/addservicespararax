// components/Scene3D.tsx
'use client';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { useRef } from 'react';
import { Mesh } from 'three';
import { Fluid } from '@/lib/Fluid';


// Exporta Torus para usarlo en Canvas
export const Torus = () => {
    const meshRef = useRef<Mesh>(null);

    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
    });
    
    return (
        <>
            <ambientLight intensity={10.1} />
            <directionalLight position={[2, 20, 10]} />
            <Environment preset='warehouse' />

            <mesh position-z={-4} ref={meshRef}>
                <torusGeometry args={[2.8, 0.8, 100, 100]} />
                <MeshTransmissionMaterial
                    transmission={1}
                    samples={1}
                    anisotropy={0}
                    chromaticAberration={0}
                />
            </mesh>
        </>
    );
};

// Exporta el efecto Fluid
export const FluidEffect = () => {
    return (
        <EffectComposer>
            <Fluid />
        </EffectComposer>
    );
};
