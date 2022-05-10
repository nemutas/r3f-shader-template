import React, { FC, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DistortionPatternSphere } from './DistortionPatternSphere';
import { Postprocessing } from './postprocessing/Postprocessing';

export const TCanvas: FC = () => {
	return (
		<Canvas
			camera={{
				position: [0, 0, 3],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}
			shadows>
			<color attach="background" args={['#000']} />
			<OrbitControls />
			<Suspense fallback={null}>
				<DistortionPatternSphere />
				<Postprocessing />
			</Suspense>
		</Canvas>
	)
}
