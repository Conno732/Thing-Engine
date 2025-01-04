import { vec3 } from "gl-matrix";

export class Scale {
	constructor(public vec3: vec3 = [0, 0, 0]) {}

	public addScale(otherScale: Scale): Scale {
		vec3.add(this.vec3, this.vec3, otherScale.vec3);
		return this;
	}
}
