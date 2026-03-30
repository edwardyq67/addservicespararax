'use client'
import { Canvas as R3fCanvas } from '@react-three/fiber';
import { Suspense } from 'react';
// Importa directamente los componentes que van dentro
import { Torus, FluidEffect } from '@/components/Scene3D';
import Text from '@/components/Text';

const Canvas = () => {
    return (
        <>
          <R3fCanvas
            style={{
                position: 'sticky',
                top: 0,
                left: 0,
                height: '100vh',
            }}
        >
            <Suspense fallback={null}>
                {/* Todo el contenido 3D va aquí directamente */}
                <Text />
                <Torus />
                <FluidEffect />
            </Suspense>
        </R3fCanvas>
        </>
      
    );
};

export default Canvas;