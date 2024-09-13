export class Mesh3D {
	constructor(
		public programName: string,
		public vao: WebGLVertexArrayObject,
		public count: number,
		public uniformLocs: UniformLocations
	) {}
}

export type UniformLocations = {
	[name: string]: WebGLUniformLocation;
};
