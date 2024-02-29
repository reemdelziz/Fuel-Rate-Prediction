import { Instance, Instances, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, DoubleSide, MathUtils } from "three";

const INSTANCES = 240; //this is the number of speed shapes i want to display on scroll
const MAX_OPACITY = 0.1; // this is the max opactiy visable on the screen when scrolled fast

//need to create the speed shape


const SpeedShape = () => {
    const ref = useRef();
    let randomPosition = { x: 0, y: 0, z: 0, };
    let randomSpeed = 0;

    const resetRandom = () => {
        randomPosition = { //randomly setting the x,y,z positions of the speedshape 
            x: MathUtils.randFloatSpread(8),
            y: MathUtils.randFloatSpread(5),
            z: MathUtils.randFloatSpread(8)
        };
        randomSpeed = MathUtils.randFloat(16, 20); //setting random speed of the speedshape
    };
    resetRandom(); //call our fuction to intialize the values of positions  and speed

    useFrame((_state, delta) => {
        if (ref.current) { //cheecking if the there exist a speedshape based on screen which exist based on scrolling behavior
            ref.current.position.z += randomSpeed * delta; //updating the z position of the speedshape based on the scrolling behavior
            if (ref.current.position.z > 5) { //if the speedshave is too far then change speedshape = randompositon.z after restRandom function called
                resetRandom();
                ref.current.position.z = randomPosition.z;
            }
        }
    });
    return (
        /*This creates the SpeedShape and we have writen javascript to set random postion of the speed shape and have the speed shape change its position on the z axis */
        <Instance
            ref={ref}
            color={"white"}
            position={[randomPosition.x, randomPosition.y, randomPosition.z]}
            rotation-y={Math.PI / 2}
        />
    );
};

export const Speed = () => {
    const speedMaterial = useRef();
    const scroll = useScroll();
    const lastScroll = useRef(0);
    useFrame((_state, delta) => {
        if(scroll.offset - lastScroll.current > 0.00005){ //checks if the cur scroll position - cur lastScrol postion is past our threshold then set the speed shap object with max opacity
            speedMaterial.current.opacity = MAX_OPACITY; 
        }
        lastScroll.current = scroll.offset;
        if(speedMaterial.current.opacity > 0){
            speedMaterial.current.opacity -= delta * 0.2; //once the frame of the scroll tends to slow down we decrease opacity bt the time and const 0.2
        }
    });

    return (
        <group>
            <Instances> {/* Renders multiple instances of speed shapes */}
                <planeGeometry args = {[1, 0.004]}/> /* Represents the 3D object */
                <meshBasicMaterial
                    ref={speedMaterial}
                    side={DoubleSide}
                    blending={AdditiveBlending}
                    opacity={0}
                    transparent
                />
                {Array(INSTANCES) 
                    .fill()
                    .map((_, key) =>(
                        <SpeedShape key = {key} />
                ))}
            </Instances>
        </group>
    );
};

