/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import React from "react";

export function CloudModel({ opacity, ...props }) {
  const { nodes, materials } = useGLTF("./models/cloud/model.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball001.geometry}>
        <meshStandardMaterial
          envMapIntensity={2}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/cloud/model.gltf");