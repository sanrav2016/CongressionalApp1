import { useRef, useState, useEffect } from "react";
import { useGLTF, useFBX, useAnimations, useTexture } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native"

import model from './Dave.glb'
import idleAnimation from './Idle.fbx'
import eye from './Dave/Dave_image2.jpg'
import head from './Dave/Dave_image1.jpg'
import teeth from './Dave/Dave_image0.jpg'
import body from './Dave/Dave_image11.jpg'
import bottom from './Dave/Dave_image5.jpg'
import bottomNormal from './Dave/Dave_image4.jpg'
import footwear from './Dave/Dave_image8.jpg'
import footwearNormal from './Dave/Dave_image7.jpg'
import top from './Dave/Dave_image10.jpg'
import topNormal from './Dave/Dave_image9.jpg'
import hair from './Dave/Dave_image13.jpg'
import hairNormal from './Dave/Dave_image12.jpg'

export default function Dave({ speakingRef, gyroscopeRef }) {
  const { nodes, materials } = useGLTF(model)
  const group = useRef()

  const { animations: idle } = useFBX(idleAnimation)
  idle[0].name = "Idle"
  const [animation, setAnimation] = useState("Idle")
  const { actions } = useAnimations([idle[0]], group)

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play()
    return () => actions[animation].fadeOut(0.5)
  }, [animation])

  const viseme_list = ["viseme_sil","viseme_PP","viseme_FF","viseme_TH","viseme_DD","viseme_kk","viseme_CH","viseme_SS","viseme_nn","viseme_RR","viseme_aa","viseme_E","viseme_I","viseme_O","viseme_U", "mouthOpen", "mouthSmile", "eyesClosed", "eyesLookUp", "eyesLookDown"]

  const setMorphInfluence = (x, y) => {
    nodes.Wolf3D_Head.morphTargetInfluences[
      nodes.Wolf3D_Head.morphTargetDictionary[x]
    ] = y;
    nodes.Wolf3D_Teeth.morphTargetInfluences[
      nodes.Wolf3D_Teeth.morphTargetDictionary[x]
    ] = y;
  }

  const removeAllMorphInfluences = () => {
    viseme_list.forEach((x) => {
      setMorphInfluence(x, 0)
    })
  }
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    time.current += 0.03;
    removeAllMorphInfluences()
    var x = -1.57 - gyroscopeRef.current.beta * 0.02
    if (x < -1.59) x = -1.59
    if (x > -1.53) x = 1.53
    group.current.rotation.x = x
    var z = -gyroscopeRef.current.gamma * 0.2
    if (z > 0.5) z = 0.5
    if (z < -0.5) z = -0.5
    group.current.rotation.z = z
    if (speakingRef.current == true) {
      setMorphInfluence("viseme_aa", 1)
    }
  });

  const eyeTexture = useTexture(eye)
  const headTexture = useTexture(head)
  const teethTexture = useTexture(teeth)
  const bodyTexture = useTexture(body)
  const bottomTexture = useTexture(bottom)
  const topTexture = useTexture(footwear)
  const footwearTexture = useTexture(top)
  const hairTexture = useTexture(hair)
  const bottomTextureNormal = useTexture(bottomNormal)
  const topTextureNormal = useTexture(footwearNormal)
  const footwearTextureNormal = useTexture(topNormal)
  const hairTextureNormal = useTexture(hairNormal)

  eyeTexture.flipY = false
  headTexture.flipY = false
  teethTexture.flipY = false
  bodyTexture.flipY = false
  bottomTexture.flipY = false
  topTexture.flipY = false
  footwearTexture.flipY = false
  hairTexture.flipY = false
  bottomTextureNormal.flipY = false
  topTextureNormal.flipY = false
  footwearTextureNormal.flipY = false
  hairTextureNormal.flipY = false

  return (
    <group rotation={[-1.57, 0, 0]} position={[0, 0, 1]} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        material={materials.EyeLeft}
        frustumCulled={false}
      >
          <meshPhysicalMaterial map={eyeTexture} />
      </skinnedMesh>
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        material={materials.EyeRight}
        frustumCulled={false}
      >
        <meshPhysicalMaterial map={eyeTexture} />
      </skinnedMesh>
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        material={materials.Wolf3D_Head}
        frustumCulled={false}
      >
        <meshPhysicalMaterial map={headTexture} />
      </skinnedMesh>
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        frustumCulled={false}
      >
        <meshPhysicalMaterial map={teethTexture} />
      </skinnedMesh>
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        skeleton={nodes.Wolf3D_Body.skeleton}
        frustumCulled={false}
      >
        <meshPhysicalMaterial map={bodyTexture} />
      </skinnedMesh>
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        frustumCulled={false}
      >
        <meshPhysicalMaterial map={bottomTexture} normalMap={bottomTextureNormal} />
      </skinnedMesh>
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        frustumCulled={false}
      >
        <meshPhysicalMaterial map={footwearTexture} normalMap={footwearTextureNormal} />
      </skinnedMesh>
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        frustumCulled={false}
      >
        <meshPhysicalMaterial map={topTexture} normalMap={topTextureNormal} />
      </skinnedMesh>
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        skeleton={nodes.Wolf3D_Hair.skeleton}
        frustumCulled={false}
      >
        <meshPhysicalMaterial map={hairTexture} normalMap={hairTextureNormal} />
      </skinnedMesh>
    </group>
  );
}