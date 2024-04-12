import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Earth } from './Earth';
import '../style.css';

export const Testing = () => {
    return (
        <Canvas shadows camera={{position: [3,3,3], fov: 30}}>
            <Earth />
        </Canvas>
    );
};
