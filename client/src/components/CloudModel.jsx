/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/cloud/cloud.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function CloudModel( { opacity, ...props } ) {
  const { nodes, materials } = useGLTF('./models/cloud/Cloud.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry}>
        <meshStandardMaterial
          {...materials["lambert2SG.001"]}
          transparent
          opacity={opacity}
        />
      </mesh> 
    </group>
  )
}

useGLTF.preload('./models/cloud/Cloud.glb')
