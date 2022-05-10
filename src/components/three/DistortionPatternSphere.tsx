import React, { FC } from 'react';
import { Icosahedron, Sphere, useMatcapTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import fragmentShader from '../../modules/glsl/sphereFrag.glsl';
import vertexShader from '../../modules/glsl/sphereVert.glsl';
import { GUIController } from '../../modules/gui';

const datas = {
	scale: 0.7
}

export const DistortionPatternSphere: FC = () => {
	const [inner_matcap] = useMatcapTexture('2B2828_7B796F_534F4A_616464', 512)
	const [outer_matcap] = useMatcapTexture('71623B_ECDE8C_30250A_ABA69A', 512)

	const gui = GUIController.instance.setFolder('Uniforms')
	gui.addNumericSlider(datas, 'scale', 0, 1, 0.01)

	const shader: THREE.Shader = {
		uniforms: {
			u_time: { value: 0 },
			u_scale: { value: datas.scale },
			u_matcap: { value: outer_matcap }
		},
		vertexShader,
		fragmentShader
	}

	useFrame(() => {
		shader.uniforms.u_time.value += 0.005
		shader.uniforms.u_scale.value = datas.scale
	})

	return (
		<>
			<Icosahedron args={[1, 20]}>
				<shaderMaterial args={[shader]} transparent />
			</Icosahedron>
			<Icosahedron args={[1, 20]} scale={0.995}>
				<meshMatcapMaterial matcap={inner_matcap} />
			</Icosahedron>
		</>
	)
}
