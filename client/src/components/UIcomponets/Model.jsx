
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Float } from '@react-three/drei';
export function Model(props) {
  const { nodes, materials } = useGLTF('./models/objects/rotating_objects.glb')
  return (
    <Float >
      <group {...props} dispose={null}>
        <group position={[0.34, 0.17, 2.57]} rotation={[1.87, 1.46, 1.48]} scale={[-1.48, -1.48, -1.67]}>
          <mesh geometry={nodes.Mesh1_Model_1.geometry} material={materials.M_0136_Charcoal} />
          <mesh geometry={nodes.Mesh1_Model_1_1.geometry} material={materials.M_0135_DarkGray} />
          <mesh geometry={nodes.Mesh1_Model_1_2.geometry} material={materials.Color_M08} />
          <mesh geometry={nodes.Mesh1_Model_1_3.geometry} material={materials.Color_M00} />
          <mesh geometry={nodes.Mesh1_Model_1_4.geometry} material={materials.Color_L05} />
          <mesh geometry={nodes.Mesh1_Model_1_5.geometry} material={materials.M_0137_Black} />
          <mesh geometry={nodes.Mesh1_Model_1_6.geometry} material={materials.M_0130_Gainsboro} />
          <mesh geometry={nodes.Mesh1_Model_1_7.geometry} material={materials.M_0132_LightGray} />
          <mesh geometry={nodes.Mesh1_Model_1_8.geometry} material={materials.Color_M06} />
          <mesh geometry={nodes.Mesh1_Model_1_9.geometry} material={materials.M_0134_DimGray} />
          <mesh geometry={nodes.Mesh1_Model_1_10.geometry} material={materials.FrontColor} />
          <mesh geometry={nodes.Mesh1_Model_1_11.geometry} material={materials.Color_A05} />
          <mesh geometry={nodes.Mesh1_Model_1_12.geometry} material={materials.M_0010_Snow} />
          <mesh geometry={nodes.Mesh1_Model_1_13.geometry} material={materials.Color_M02} />
          <mesh geometry={nodes.Mesh1_Model_1_14.geometry} material={materials.Color_D05} />
        </group>
        <mesh geometry={nodes.WorldObject.geometry} material={materials['Material.001']} position={[2.63, 4.03, -2.14]} scale={0.1} />
        <group position={[-2.61, 2.54, -1.26]} rotation={[3.12, -1.37, -2.98]} scale={1.7}>
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh'].geometry} material={materials['Material.013']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_1'].geometry} material={materials['Material.014']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_2'].geometry} material={materials['Material.002']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_3'].geometry} material={materials['Material.004']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_4'].geometry} material={materials['Material.003']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_5'].geometry} material={materials['Material.006']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_6'].geometry} material={materials['Material.007']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_7'].geometry} material={materials['Material.008']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_8'].geometry} material={materials['Material.009']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_9'].geometry} material={materials['Material.010']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_10'].geometry} material={materials['Material.012']} />
          <mesh geometry={nodes['FrontRightWheel_Cylinder002-Mesh_11'].geometry} material={materials['Material.011']} />
        </group>
        <group position={[-2.56, 0.75, 6.46]} rotation={[0, 1.46, 0]} scale={[0.54, 0.35, 0.63]}>
          <mesh geometry={nodes.mesh1831363276.geometry} material={materials.mat5} />
          <mesh geometry={nodes.mesh1831363276_1.geometry} material={materials.mat21} />
          <mesh geometry={nodes.mesh1831363276_2.geometry} material={materials.mat12} />
          <mesh geometry={nodes.mesh1831363276_3.geometry} material={materials.mat15} />
          <mesh geometry={nodes.mesh1831363276_4.geometry} material={materials.mat8} />
          <mesh geometry={nodes.mesh1831363276_5.geometry} material={materials.mat22} />
          <mesh geometry={nodes.mesh1831363276_6.geometry} material={materials.mat14} />
          <mesh geometry={nodes.mesh1831363276_7.geometry} material={materials.mat23} />
        </group>
      </group>
    </Float>
  )
}

useGLTF.preload('./models/objects/rotating_objects.glb')
