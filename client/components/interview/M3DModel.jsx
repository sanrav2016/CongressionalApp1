import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber/native'
import { useTexture } from '@react-three/drei/native'
import { PerspectiveCamera } from "three"
import Dave from '../../interviewer_3d/Dave/Dave'
import background from "../../assets/images/background.jpg"

const Background = () => {
    const bkg = useTexture(background);

    return (
        <mesh scale={0.025}>
            <planeGeometry args={[100, 1000]} />
            <meshBasicMaterial map={bkg} />
        </mesh>
    );
}

const M3DModel = ({ speakingRef, gyroscopeRef }) => {
    const canvasCamera = new PerspectiveCamera();
    canvasCamera.position.set(0.03, 1.65, 2);
    canvasCamera.lookAt(0.03, 1.65, 1);

    return (
        <Canvas camera={canvasCamera} className="w-full h-full">
            <Background />
            <ambientLight />
            <directionalLight color="white" intensity={1} />
            <pointLight position={[0, 1.7, 1.5]} color="magenta" intensity={1} />
            <pointLight position={[0.06, 1.7, 1.5]} color="cyan" intensity={1} />
            <Suspense fallback={null}>
                <Dave speakingRef={speakingRef} gyroscopeRef={gyroscopeRef} />
            </Suspense>
        </Canvas>
    )
}

export default M3DModel