import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import ThreeGlobe from 'three-globe';
import { useEffect, useRef } from "react";

export const Earth = ({ countries, lines, map }) => {
    const globeRef = useRef();

    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002; // Adjust the rotation speed as needed
        }
    });

    useEffect(() =>{
        if(globeRef.current){
            const globe = new ThreeGlobe({
                waitForGlobeReady: true,
                animateIn: true,
            });
            globe 
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(true)
            .atmosphereColor("#687EFF")
            .atmosphereAltitude(0.25)
            
            const globeMaterial = globe.globeMaterial();
            globeMaterial.color = new THREE.Color("#687EFF");
            globeMaterial.emissive = new THREE.Color("#E0F4FF");
            globeMaterial.emissiveIntensity = 0.1;
            globeMaterial.shininess = 0.7; 

            setTimeout(()=>{
                globe.arcsData(lines.pulls)
                .arcColor((e)=>{
                    return e.status ? "#9cff00" : "#ff4000";
                })
                .arcAltitude((e)=> {
                    return e.arcAlt;
                })
                .arcStroke((e)=>{
                    return e.status ? 0.5 : 0.3
                })
                .arcDashLength(0.9)
                .arcDashGap(4)
                .arcDashAnimateTime(1000)
                .arcsTransitionDuration(1000)
                .arcDashInitialGap((e) => e.order * 1)
                .labelsData(map.maps)
                .labelColor(() => "#ffcb21")

                .labelDotRadius(0.3)
                .labelSize((e) => e.size)
                .labelText("city")
                .labelColor("#FFFFF")
                .labelResolution(6)
                .labelAltitude(0.01)
                .pointsData(map.maps)
                .pointColor(() => "#ffffff")
                .pointsMerge(true)
                .pointAltitude(0.07)
                .pointRadius(0.05);

            }, 1000)

            globeRef.current.add(globe);
        }
    }, [countries, lines, map]);

    return(
        <>
            <ambientLight color={0xbbbbbb} intensity={2} />
            <directionalLight color={0xffffff} intensity={0.8} position={[-200, 500, 200]}/>
            <pointLight color={0x8566cc} intensity={0.5} position={[-200, 500, 200]} />
            <Environment preset ="sunset" />
            <fog attach="fog" args={['#687EFF', 1, 1000]} />
            <group ref={globeRef}/>
        </>
    )
}