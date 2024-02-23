import { Float, OrbitControls, PerspectiveCamera, useScroll, Html, Text } from "@react-three/drei";
import { Background } from './Background';
import { CarModel } from "./CarModel";
import { CloudModel } from "./CloudModel";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import { LoginForm } from "./LoginForm";

const LINE_NB_POINTS = 12000; //creating const variable with number of points on the line
const CURVE_DISTANCE = 250; //create curve distance to be able to change the depth of the curve
const CURVE_AHEAD_CAMERA = 0.008;

export const Experience = () => {
    const curve = useMemo(() => { //creating the curve and using useMemo hook to memoize (lets you skip re-rendering when a componenet 'note the creation of the curve' when its props are unchanged)
        return new THREE.CatmullRomCurve3(
            [
                //these are the control points of the curve.
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -CURVE_DISTANCE),
                new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
                new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
                new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
                new THREE.Vector3(5, 0, -5 * CURVE_DISTANCE),
                new THREE.Vector3(7, 0, -6 * CURVE_DISTANCE),
                new THREE.Vector3(5, 0, -7 * CURVE_DISTANCE),

            ],
            false, //defining that the cure is not closed 'false'
            "catmullrom", //specifying the type of spline interpolation to use
            0.5 //specifying the tension of the curve
        );
    }, []);


    //linePoints is used to calculate the points along the curve.
    const linePoints = useMemo(() => { //the useMemo hook is use to memoize the computation so that it only recaluclates the points when the curve object changes
        return curve.getPoints(LINE_NB_POINTS); //the getpoints method is used on the curve object to generate the specifed number of points(12000) along the curve. the points represent position along the curve
    }, [curve]);

    /* 
        -adds persepective with the line. generating a plane based on our curve.
        -this would extrude our shape to follow the curve
    */
    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);

        return shape;
    }, [curve]);

    //we want our camera plane to be in parative with the scroll
    const cameraGroup = useRef();
    const scroll = useScroll();
    const car = useRef();

    useFrame((_state, delta) => { //the useFram hook allows us to preform actions on every frame of the 3D rendering loop

        const scrollOffset = Math.max(0, scroll.offset);


        const curPoint = curve.getPoint(scrollOffset);

        // Follow the curve points
        cameraGroup.current.position.lerp(curPoint, delta * 24);

        // Make the group look ahead on the curve

        const lookAtPoint = curve.getPoint(
            Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1)
        );

        const currentLookAt = cameraGroup.current.getWorldDirection(
            new THREE.Vector3()
        );
        const targetLookAt = new THREE.Vector3()
            .subVectors(curPoint, lookAtPoint)
            .normalize();

        const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
        cameraGroup.current.lookAt(
            cameraGroup.current.position.clone().add(lookAt)
        );




    });

    return (
        <>
            {/*<OrbitControls /> */}
            <group ref={cameraGroup}>
                <Background />
                <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
                <group ref={car}>
                    <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
                        <CarModel
                            scale={[0.25, 0.25, 0.25]}
                        />
                    </Float>
                </group>
            </group>

            {/* Title and Forms */}
            <group position={[-3, 0, -100]}>
                <Text
                    color="white"
                    anchorX={"left"}
                    anchorY={"middle"}
                    fontSize={0.22}
                    maxWidth={2.5}
                >
                    Fuel Rate Predictor{"\n"}
                    Enhancing Fuel Management Efficiency
                </Text>
            </group>

            <group position={[-10, 1, -200]}>


            </group>

            {/* LINE */}
            <group position-y={-2}>
                <mesh>
                    <extrudeGeometry
                        args={[
                            shape,
                            {
                                steps: LINE_NB_POINTS,
                                bevelEnabled: false,
                                extrudePath: curve,
                            },
                        ]}
                    />
                    <meshStandardMaterial color={"white"} opacity={0.7} transparent />
                </mesh>
            </group>


            {/* CLOUDS */}
            <CloudModel scale={[1, 1, 1.5]} position={[-3.5, -1.2, -7]} />
            <CloudModel scale={[1, 1, 2]} position={[3.5, -1, -10]} rotation-y={Math.PI} />
            <CloudModel
                scale={[1, 1, 1]}
                position={[-3.5, 0.2, -12]}
                rotation-y={Math.PI / 3}
            />
            <CloudModel scale={[1, 1, 1]} position={[3.5, 0.2, -12]} />

            <CloudModel
                scale={[0.4, 0.4, 0.4]}
                rotation-y={Math.PI / 9}
                position={[1, -0.2, -12]}
            />
            <CloudModel scale={[0.3, 0.5, 2]} position={[-4, -0.5, -53]} />
            <CloudModel scale={[0.8, 0.8, 0.8]} position={[-1, -1.5, -100]} />

        </>
    );
};