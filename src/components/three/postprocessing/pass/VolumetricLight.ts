import * as THREE from 'three';
import fragmentShader from '../../../../modules/glsl/volumetricLightFrag.glsl';
import vertexShader from '../../../../modules/glsl/volumetricLightVert.glsl';
import { GUIController } from '../../../../modules/gui';
import { CustomBasePass } from './Base';

const datas = {
	enabled: true,
	exposure: 0.2,
	decay: 0.95,
	density: 0.75,
	weight: 0.4,
	samples: 100
}

export class VolumetricLight extends CustomBasePass {
	constructor() {
		const uniforms = {
			u_lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
			u_exposure: { value: datas.exposure },
			u_decay: { value: datas.decay },
			u_density: { value: datas.density },
			u_weight: { value: datas.weight },
			u_samples: { value: datas.samples }
		}
		super(uniforms, vertexShader, fragmentShader)

		this._initController()
	}

	protected _initController = () => {
		const gui = GUIController.instance.setFolder('VolumetricLight').open(false)
		gui.addCheckBox(datas, 'enabled')
		gui.addNumericSlider(datas, 'exposure', 0, 1, 0.01)
		gui.addNumericSlider(datas, 'decay', 0, 1, 0.01)
		gui.addNumericSlider(datas, 'density', 0, 1, 0.01)
		gui.addNumericSlider(datas, 'weight', 0, 1, 0.01)
		gui.addNumericSlider(datas, 'samples', 10, 100, 10)
	}

	update = () => {
		// validate pass
		if (!this.ref.current) return

		const pass = this.ref.current
		pass.enabled = datas.enabled

		if (!pass.enabled) return

		// update uniforms
		pass.uniforms.u_exposure.value = datas.exposure
		pass.uniforms.u_decay.value = datas.decay
		pass.uniforms.u_density.value = datas.density
		pass.uniforms.u_weight.value = datas.weight
		pass.uniforms.u_samples.value = datas.samples
	}
}
