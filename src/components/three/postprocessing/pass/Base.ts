import { createRef } from 'react';
import * as THREE from 'three';
import { ShaderPass } from 'three-stdlib';

export abstract class BasePass {
	protected abstract _initController: () => void
	abstract update: (...args: any) => void
}

export abstract class BaseShader extends BasePass {
	public ref
	public shader: THREE.Shader

	constructor(shader: THREE.Shader) {
		super()

		this.ref = createRef<ShaderPass>()
		this.shader = shader
	}
}

export abstract class BaseCustomShader extends BaseShader {
	constructor(uniforms: { [uniform: string]: THREE.IUniform<any> }, vertexShader: string, fragmentShader: string) {
		const shader = {
			uniforms: THREE.UniformsUtils.merge([{ tDiffuse: { value: null } }, uniforms]),
			vertexShader,
			fragmentShader
		}
		super(shader)
	}
}
