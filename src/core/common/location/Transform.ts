import { vec3 } from "gl-matrix";
import { Rotation } from "./Rotation";
import { Scale } from "./Scale";
import { Translation } from "./Translation";

export class Transform {
	private parentTransform: Transform;
	private localTranslation: Translation;
	private localScale: Scale;
	private localRotation: Rotation;

	constructor() {
		this.localTranslation = new Translation([0, 0, 0]);
		this.localScale = new Scale([1, 1, 1]);
		this.localRotation = new Rotation([0, 0, 0]);
	}

	public setParentTransform(transform: Transform) {
		this.parentTransform = transform;
	}

	public translate(vec3: vec3) {
		this.localTranslation.addTranslation(new Translation(vec3));
	}

	public eulerRotate(vec3: vec3) {
		this.localRotation.addRotation(new Rotation(vec3));
	}

	public scale(vec3: vec3) {
		this.localScale.addScale(new Scale(vec3));
	}

	public getTranslation(): Translation {
		return this.parentTransform == null
			? this.localTranslation
			: new Translation()
					.addTranslation(this.localTranslation)
					.addTranslation(this.parentTransform.getTranslation());
	}

	public getRotation(): Rotation {
		return this.parentTransform == null
			? this.localRotation
			: new Rotation()
					.addRotation(this.localRotation)
					.addRotation(this.parentTransform.getRotation());
	}

	public getScale(): Scale {
		return this.parentTransform == null
			? this.localScale
			: new Scale()
					.addScale(this.localScale)
					.addScale(this.parentTransform.getScale());
	}

	public getLocalTranslation(): Translation {
		return this.localTranslation;
	}

	public getLocalRotation(): Rotation {
		return this.localRotation;
	}

	public getLocalScale(): Scale {
		return this.localScale;
	}
}
