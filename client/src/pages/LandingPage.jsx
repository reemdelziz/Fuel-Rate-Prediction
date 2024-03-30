import { Canvas } from '@react-three/fiber';
import { Loader, ScrollControls } from '@react-three/drei';
import { Experience } from '../components/landingPage/Experience';
import { Overlay } from '../components/landingPage/Overlay';
import { usePlay } from '../utils/Play';


export const LandingPage = () => {
    const { play, end } = usePlay();
    return (
        <>
            <Canvas >
                <color attach="background" args={["#ececec"]} />
                <ScrollControls
                    pages={play && !end ? 10 : 0}
                    damping={0.5}
                    style={{
                        top: "10px", left: "0px",
                        bottom: "10px",
                        right: "10px",
                        width: "auto",
                        height: "auto",
                        animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
                        opacity: 0,
                    }}
                >
                    <Experience />
                </ScrollControls>
            </Canvas>
            <Loader />
            <Overlay />
        </>
    )
};