import { vec3 } from "gl-matrix";

export class Rotation {
	constructor(public vec3: vec3 = [0, 0, 0]) {}

	public addRotation(otherRotation: Rotation): Rotation {
		vec3.add(this.vec3, this.vec3, otherRotation.vec3);
		return this;
	}
}
