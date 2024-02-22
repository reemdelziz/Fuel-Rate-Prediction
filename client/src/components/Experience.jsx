import { Float, PerspectiveCamera , useScroll } from "@react-three/drei";
import { Background } from './Background';
import { CarModel } from "./CarModel";
import { CloudModel } from "./CloudModel";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const LINE_NB_POINTS = 12000; //creating const variable with number of points on the line

export const Experience = () => {
    const curve = useMemo(()=> { //creating the curve and using useMemo hook to memoize (lets you skip re-rendering when a componenet 'note the creation of the curve' when its props are unchanged)
        return new THREE.CatmullRomCurve3(
            [
                //these are the control points of the curve.
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -10),
                new THREE.Vector3(-2, 0, -20),
                new THREE.Vector3(-3, 0, -30),
                new THREE.Vector3(0, 0, -40),
                new THREE.Vector3(5, 0, -50),
                new THREE.Vector3(7, 0, -60),
                new THREE.Vector3(5, 0, -70),
                new THREE.Vector3(0, 0, -80),
                new THREE.Vector3(0, 0, -90),
                new THREE.Vector3(0, 0, -100),
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
    const shape = useMemo(() =>{
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);

        return shape;
    }, [curve]);

    //we want our camera plane to be in parative with the scroll
    const cmaeraGroup = useRef();
    const scroll = useScroll();

    useFrame((_state, delta) => { //the useFram hook allows us to preform actions on every frame of the 3D rendering loop
        
        //calculate the current point index along the curve based on the scroll effect
        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length), //rounds the result number of when multiplying the scroll offset by the total number of points on the curve
            linePoints.length - 1 //making sure within valid range of indices 
        );

        //get the current and the next points
        const curPoint = linePoints[curPointIndex];
        const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length -1)]; //making sure the index for the next point stays within the valid range of indices

        //calculate the x displacement and rotaion angle
        const xDisplacement = (pointAhead.x - curPoint.x) * 80; //x-displacement is scaled by a factor of 80 
        const angleRotation =
            (xDisplacement <0 ? 1 : -1) *
            Math.min(Math.abs(xDisplacement), Math.PI / 3);

        //calculate the target quaternoions
        const targetAirplaneQuaternions = new THREE.Quaternion().setFromEuler(
            
        )
    })
    return (
        <>
            {/*<OrbitControls enableZoom={false}/> */}
            <Background />
            <Float floatIntensity={1} speed={2}>
                <CarModel
                    scale={[0.25, 0.25, 0.25]}
                />
            </Float>

            {/*Clouds*/}
            <CloudModel opacity={0.5} scale={[0.3,0.3,0.3]} position ={[-2,1,-3]} />
            <CloudModel opacity={0.5} scale={[0.2,0.3,0.4]} position ={[1.5,-0.5,-2]} />
            <CloudModel
                opacity={0.7}
                scale={[0.3,0.3,0.4]}
                rotation-y={Math.PI / 9}
                position={[2,-0.2,-2]}
            />
            
            <CloudModel opacity={0.7} scale={[0.5,0.5,0.5]} position ={[-1,1,53]} />
            <CloudModel opacity={0.3} scale={[0.8,0.8,0.8]} position ={[0,1,-100]} />
        </>
    );
};