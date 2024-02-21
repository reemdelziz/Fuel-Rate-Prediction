import { Float, OrbitControls } from "@react-three/drei";
import { Background } from './Background';
import { CarModel } from "./CarModel";
import { CloudModel } from "./CloudModel";

export const Experience = () => {
    return (
        <>
            <OrbitControls />
            <Background />
            <Float floatIntensity={1} speed={2}>
                <CarModel
                    scale={[0.25, 0.25, 0.25]}
                />
            </Float>

            <CloudModel
                opacity={0.7}
                scale={[0.3, 0.3, 0.4]}
                rotation-y={Math.PI / 9}
                position={[2, 1, -2]} // Adjusted position
            />
            <CloudModel
                opacity={0.7}
                scale={[0.3, 0.3, 0.4]}
                rotation-y={Math.PI / 9}
                position={[-2, 1, 2]} // Adjusted position
            />
            <CloudModel
                opacity={0.7}
                scale={[0.3, 0.3, 0.4]}
                rotation-y={Math.PI / 9}
                position={[2, 1, 2]} // Adjusted position
            />
            <CloudModel
                opacity={0.7}
                scale={[0.3, 0.3, 0.4]}
                rotation-y={Math.PI / 9}
                position={[-2, 1, -2]} // Adjusted position
            />
        </>
    );
};