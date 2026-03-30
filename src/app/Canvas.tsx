'use client'
import { Canvas as R3fCanvas } from '@react-three/fiber';
import { Suspense } from 'react';
// Importa directamente los componentes que van dentro
import { FluidEffect } from '@/components/Scene3D';

const Canvas = () => {
    return (
        <>
            <div className="relative min-h-[250dvh] bg-black">
                <R3fCanvas
                    style={{
                        position: 'sticky',
                        top: 0,
                        left: 0,
                        height: '100vh',

                    }}
                >
                    <Suspense fallback={null}>
                        <FluidEffect />
                    </Suspense>
                </R3fCanvas>
            </div>

        </>

    );
};

export default Canvas;