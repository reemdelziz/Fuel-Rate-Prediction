import React from "react";
import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/landingPage/UIexperience/Experience';
import { ScrollControls } from '@react-three/drei';

export const TestHome = () => {
    return(<div id="home-wrapper">
        <Canvas >
            <color attach="background" args={["#ececec"]} />
            <ScrollControls pages= {10} damping={1}>
                <Experience />
            </ScrollControls>
        </Canvas>
    </div>)
}
