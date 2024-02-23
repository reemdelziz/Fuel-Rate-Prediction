import React from "react";
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { ScrollControls } from '@react-three/drei';

const Home = () => {
    return(<div id="home-wrapper">
        <Canvas >
            <color attach="background" args={["#ececec"]} />
            <ScrollControls pages= {10} damping={1}>
            <Experience />
            </ScrollControls>
      </Canvas>
    </div>)
}
