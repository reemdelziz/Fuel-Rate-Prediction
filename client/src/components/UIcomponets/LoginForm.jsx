import { CarModel } from "../landingPage/CarModel";

import * as THREE from "three";
import { Float, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Background } from "../landingPage/Background";
import { useRef } from "react";

export const LoginForm = () => {
    const username = '';
    const password = '';

    const backgroundColors = useRef({
        colorA: "#1D24CA",
        colorB: "#9195F6",
    });
    return (
        <>

            <Canvas>
                
                <Html>
                    <div className='container'>
                        {/* First column that includes image of car */}
                        <div className='column'>
                            <img className="login-car" />
                        </div>
                        {/* second column includes login form */}
                        <div className='column'>

                            {/* //Create login form */}
                            <div className="login">
                                <h1>Login.</h1>
                                <p className='rightSide'>Unlock streamlined fuel management with our secure login portal. Access personalized quotes and manage your profile hassle-free. Join us as we revolutionize fuel procurement.</p>

                                <form>
                                    <section id="fields">
                                        <div id="usernameInput">
                                            <div className="inputLabels">Username* </div>
                                            <input
                                                type="text"
                                                value={username}
                                            // onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <div style={{ width: '100%', border: '1px black solid' }}></div>
                                        </div>

                                        <div>
                                            <div className="inputLabels">Password* </div>
                                            <input
                                                type="text"
                                                value={password}
                                            // onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <div style={{ width: '100%', border: '1px black solid' }}></div>
                                        </div>
                                    </section>

                                    <button type="submit">Submit</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </Html>
            </Canvas>
        </>
    );
};
