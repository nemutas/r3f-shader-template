import { UnrealBloomPass } from 'three-stdlib';
import { extend } from '@react-three/fiber';
import { GUIController } from '../../../../modules/gui';
import { BasePass } from './Base';

extend({ UnrealBloomPass })

const datas = {
	enabled: true,
	exposure: 0.8,
	strength: 0.4,
	radius: 0.3,
	threshold: 0.68
}

export class UnrealBloom extends BasePass<UnrealBloomPass> {
	constructor(private _gl: THREE.WebGLRenderer) {
		super()
		this._initController()
	}

	protected _initController = () => {
		const gui = GUIController.instance.setFolder('UnrealBloom').open(false)
		gui.addCheckBox(datas, 'enabled')
		gui.addNumericSlider(datas, 'exposure', 0.1, 2, 0.01)
		gui.addNumericSlider(datas, 'strength', 0, 10, 0.1)
		gui.addNumericSlider(datas, 'radius', 0, 2, 0.01)
		gui.addNumericSlider(datas, 'threshold', 0, 1, 0.01)
	}

	update = () => {
		// validate pass
		if (!this.ref.current) return

		const pass = this.ref.current
		pass.enabled = datas.enabled
		this._gl.toneMappingExposure = datas.enabled ? Math.pow(datas.exposure, 4.0) : 1

		if (!pass.enabled) return

		// update uniforms
		pass.strength = datas.strength
		pass.radius = datas.radius
		pass.threshold = datas.threshold
	}
}
