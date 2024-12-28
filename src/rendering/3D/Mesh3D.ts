import { vec3 } from "gl-matrix";

export class Mesh3D {
	public translation: vec3;
	public scale: vec3;
	public rotation: vec3;

	constructor(
		public programName: string,
		public vao: WebGLVertexArrayObject,
		public count: number,
		public uniformLocs: UniformLocations
	) {
		this.translation = [0, 0, 0];
		this.scale = [1, 1, 1];
		this.rotation = [0, 0, 0];
	}
}

export type UniformLocations = {
	[name: string]: WebGLUniformLocation;
};
