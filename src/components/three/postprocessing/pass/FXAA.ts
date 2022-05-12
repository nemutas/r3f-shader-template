import { FXAAShader } from 'three-stdlib';
import { Size } from '@react-three/fiber';
import { GUIController } from '../../../../modules/gui';
import { BaseShader } from './Base';

const datas = {
	enabled: true
}

export class FXAA extends BaseShader {
	constructor() {
		super(FXAAShader)

		this._initController()
	}

	protected _initController = () => {
		const gui = GUIController.instance.setFolder('FXAA').open(false)
		gui.addCheckBox(datas, 'enabled')
	}

	update = (size: Size) => {
		// validate pass
		const pass = this.validatedPass(datas.enabled)
		if (!pass) return

		// update uniforms
		pass.uniforms.resolution.value.set(1 / size.width, 1 / size.height)
	}
}
