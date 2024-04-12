import { Environment, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import * as THREE from 'three';

import earthTexture from "../assets/images/earth-dark.jpg";

export const Earth = () => {
    const texture = useTexture(earthTexture)
    
    return(
        <>
            <ambientLight color={0xbbbbbb} intensity={0.5} />
            <directionalLight color={0xffffff} intensity={0.8} position={[-200, 500, 200]}/>
            <pointLight color={0x8566cc} intensity={0.5} position={[-200, 500, 200]} />
            <Environment preset ="sunset" />
            <OrbitControls />
            <mesh>
                <sphereGeometry args = {[1, 62, 62]} attach="geometry" />
                <meshStandardMaterial map={texture} attach="material"/>
            </mesh>
        </>
    )
}