/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/cloud/cloud.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function CloudModel(props) {
  const { nodes, materials } = useGLTF('./models/cloud/Cloud.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry} material={materials.lambert2SG} />
    </group>
  )
}

useGLTF.preload('./models/cloud/Cloud.glb')
