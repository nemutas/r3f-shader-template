import React, { FC } from 'react';
import { Effects } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { FXAA } from './pass/FXAA';
import { UnrealBloom } from './pass/UnrealBloom';
import { VolumetricLight } from './pass/VolumetricLight';

export const Postprocessing: FC = () => {
	const { gl } = useThree()

	const fxaa = new FXAA()
	const unrealBloom = new UnrealBloom(gl)
	const volumetricLight = new VolumetricLight()

	useFrame(({ size }) => {
		fxaa.update(size)
		unrealBloom.update()
		volumetricLight.update()
	})

	return (
		<Effects>
			<shaderPass ref={fxaa.ref} args={[fxaa.shader]} />
			<unrealBloomPass ref={unrealBloom.ref} />
			<shaderPass ref={volumetricLight.ref} args={[volumetricLight.shader]} />
		</Effects>
	)
}
