import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Model } from "./Model";
import { Html } from "@react-three/drei";
import "../../style.css"

export const UserEntry = () => {
    return (

        <Canvas style={{ background: "#B4B4B8" }} >
            <PerspectiveCamera position={[0, 1.3, 15]} fov={30} makeDefault />
            <Model />
            <Environment preset="city" />
            <Html>
                <div className="form-container">
                    

                </div>
            </Html>
        </Canvas>
    )

}
