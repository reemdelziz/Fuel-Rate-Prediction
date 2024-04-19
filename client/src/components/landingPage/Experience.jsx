import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { Speed } from './Speed.jsx';
import { Background } from './Background.jsx';
import { CarModel } from "./CarModel.jsx";
import { CloudModel } from "./CloudModel.jsx";
import { useCloudsRender } from "./useCloudsRender.jsx";
import { useTextRender } from "./useTextRender.jsx";
import { TextSection } from "./TextSection.jsx";
import gsap from "gsap";
import { Group } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { usePlay } from "../../provider/Play.jsx";



const LINE_NB_POINTS = 900;
const CURVE_DISTANCE = 200;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_CAR = 0.02;
const CAR_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 42;

export const Experience = () => {
    const curvePoints = useMemo(() => [
        //these are the control points of the curve.
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -CURVE_DISTANCE),
        new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
        new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
        new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
        new THREE.Vector3(5, 0, -5 * CURVE_DISTANCE),
        new THREE.Vector3(7, 0, -6 * CURVE_DISTANCE),
        new THREE.Vector3(5, 0, -7 * CURVE_DISTANCE),

    ], []);
    const sceneOpacity = useRef(0);
    const lineMaterialRef = useRef();

    const curve = useMemo(() => { //creating the curve and using useMemo hook to memoize (lets you skip re-rendering when a componenet 'note the creation of the curve' when its props are unchanged)
        return new THREE.CatmullRomCurve3(
            curvePoints,
            false, //defining that the cure is not closed 'false'
            "catmullrom", //specifying the type of spline interpolation to use
            0.5 //specifying the tension of the curve
        );
    }, []);
    /* 
       -adds persepective with the line. generating a plane based on our curve.
       -this would extrude our shape to follow the curve
   */
    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.08);
        shape.lineTo(0, 0.08);

        return shape;
    }, [curve]);


    const textSections = useTextRender(curvePoints);



    const clouds = useCloudsRender(curvePoints);
    //we want our camera plane to be in parative with the scroll
    const car = useRef();
    const cameraGroup = useRef();
    const cameraRail = useRef();
    const scroll = useScroll();
    const lastScroll = useRef(0);

    const { play, setHasScroll, end, setEnd } = usePlay();

    useFrame((_state, delta) => { //the useFram hook allows us to preform actions on every frame of the 3D rendering loop

        if (lastScroll.current <= 0 && scroll.offset > 0) {
            setHasScroll(true);
        }


        lineMaterialRef.current.opacity = sceneOpacity.current;
        if (play && !end && sceneOpacity.current < 1) {
            sceneOpacity.current = THREE.MathUtils.lerp(
                sceneOpacity.current,
                1,
                delta * 0.1
            );
        }
        if (end && sceneOpacity.current > 0) {
            sceneOpacity.current = THREE.MathUtils.lerp(
                sceneOpacity.current,
                0,
                delta
            );
        }
        if (end) {
            return;
        }

        const scrollOffset = Math.max(0, scroll.offset);

        //we want to be able to zoom in to text sections on scrol
        let friction = 1;
        let resetCameraRail = true;
        textSections.forEach((textSection) => {
            const distance = textSection.position.distanceTo(
                cameraGroup.current.position
            );
            if (distance < FRICTION_DISTANCE) {
                friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
                const targetCameraRailPosition = new THREE.Vector3(
                    (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
                    0,
                    0,
                );
                cameraRail.current.position.lerp(targetCameraRailPosition, delta);
                resetCameraRail = false;
            }
        });
        if (resetCameraRail) {
            const targetCameraRailPosition = new THREE.Vector3(0, 0, 0);
            cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        }

        //we want to calculate the lerp scroll offset
        let lerpedScrollOffset = THREE.MathUtils.lerp(lastScroll.current,
            scrollOffset,
            delta * friction
        );
        //protect below 0 and above 1
        lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
        lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

        lastScroll.current = lerpedScrollOffset;
        tl.current.seek(lerpedScrollOffset * tl.current.duration());

        const curPoint = curve.getPoint(lerpedScrollOffset);

        // Follow the curve points
        cameraGroup.current.position.lerp(curPoint, delta * 24); //positioning the camera to smoothly adjust its position to thecar 

        // Make the group look ahead on the curve

        const lookAtPoint = curve.getPoint(
            Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
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

        //car rotation
        const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_CAR);

        const nonLerpLookAt = new Group();
        nonLerpLookAt.position.copy(curPoint);
        nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

        tangent.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            -nonLerpLookAt.rotation.y
        );

        let angle = Math.atan2(-tangent.z, tangent.x);
        angle = -Math.PI / 2 + angle;

        let angleDegrees = (angle * 180) / Math.PI;
        angleDegrees *= 2.4; // stronger angle

        // LIMIT PLANE ANGLE
        if (angleDegrees < 0) {
            angleDegrees = Math.max(angleDegrees, -CAR_MAX_ANGLE);
        }
        if (angleDegrees > 0) {
            angleDegrees = Math.min(angleDegrees, CAR_MAX_ANGLE);
        }

        // SET BACK ANGLE
        angle = (angleDegrees * Math.PI) / 180;

        const targetCarQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
                car.current.rotation.x,
                car.current.rotation.y,
                angle
            )
        );
        car.current.quaternion.slerp(targetCarQuaternion, delta * 2);

        if (cameraGroup.current.position.z < curvePoints[curvePoints.length - 1].z + 100) {
            setEnd(true);
            carOutTl.current.play();
        }
    });

    const tl = useRef();
    const backgroundColors = useRef({
        colorA: "#8ac0ff",
        colorB: "#eec975",
    });

    const carInTl = useRef();
    const carOutTl = useRef();
    useLayoutEffect(() => {
        tl.current = gsap.timeline();

        tl.current.to(backgroundColors.current, {
            duration: 1,
            colorA: "#ff8080",
            colorB: "#fc6736",
        });
        tl.current.to(backgroundColors.current, {
            duration: 1,
            colorA: "#FBA834",
            colorB: "#EEA5A6",
        });
        tl.current.pause();

        carInTl.current = gsap.timeline();
        carInTl.current.pause();
        carInTl.current.from(car.current.position, {
            duration: 3,
            z: 5,
            y: -2,
        });

        carOutTl.current = gsap.timeline();
        carOutTl.current.pause();

        carOutTl.current.to(
            car.current.position,
            {
                duration: 10,
                z: -250,
                y: 10,
            },
            0
        );
        carOutTl.current.to(
            cameraRail.current.position,
            {
                duration: 8,
                y: 12,
            },
            0
        );
        carOutTl.current.to(car.current.position, {
            duration: 1,
            z: -1000,
        });
    }, []);

    useEffect(() => {
        if (play) {
            carInTl.current.play();
        }
    }, [play]);

    return useMemo(() => (
        <>
            <directionalLight position={[0, 3, 1]} intensity={0.1} />
            <group ref={cameraGroup}>
                <Speed />
                <Background backgroundColors={backgroundColors} />
                <group ref={cameraRail}>
                    <PerspectiveCamera position={[0, .5, 5]} fov={30} makeDefault />
                </group>
                <group ref={car}>
                    <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
                        <CarModel
                            rotation-y={Math.PI}
                            scale={[0.25, 0.25, 0.25]}
                        />
                    </Float>
                </group>
            </group>

            {/* TEXT */}

            {textSections.map((textSection, index) => (
                <TextSection {...textSection} key={index} />
            ))}


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
                    <meshStandardMaterial
                        color={"white"}
                        ref={lineMaterialRef}
                        opacity={1}
                        transparent
                        envMapIntensity={2}
                    />
                </mesh>
            </group>

            {/* CLOUDS */}
            {
                clouds.map((cloud, index) => (
                    <CloudModel sceneOpacity={sceneOpacity} {...cloud} key={index} />
                ))
            }

        </>
    ), []);
};