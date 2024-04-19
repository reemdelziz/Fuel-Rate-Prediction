import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Earth } from './Earth';
import '../style.css';
import customMap from "../utils/custom.geo.json";
import lines from "../utils/lines.json";
import map from "../utils/map.json";

export const Globe = () => {
    return (
        <Canvas shadows camera={{position: [0, 0, 220]}}>
            <Earth 
                countries={customMap}
                lines = {lines}
                map = {map}
            />
        </Canvas>
    );
};
