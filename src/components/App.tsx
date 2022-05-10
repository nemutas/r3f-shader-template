import React, { FC } from 'react';
import { css } from '@emotion/css';
import githubImageUrl from '../resource/github.svg';
import { LinkIconButton } from './LinkIconButton';
import { TCanvas } from './three/TCanvas';

export const App: FC = () => {
	return (
		<div className={styles.container}>
			<TCanvas />
			<LinkIconButton imagePath={githubImageUrl} linkPath="https://github.com/nemutas/r3f-shader-template" />
		</div>
	)
}

const styles = {
	container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
	`
}
