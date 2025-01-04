import { vec3 } from "gl-matrix";

export class Translation {
	constructor(public vec3: vec3 = [0, 0, 0]) {}

	public addTranslation(otherTranslation: Translation): Translation {
		vec3.add(this.vec3, this.vec3, otherTranslation.vec3);
		return this;
	}
}
