import { mat4, vec4 } from "gl-matrix";
import { Thing } from "../../core/Thing";
import { Color } from "../../core/common/Color";

export class Mesh3D extends Thing {
	public color: Color;
	public projection: mat4;

	constructor(
		public programName: string,
		public vao: WebGLVertexArrayObject,
		public count: number,
		public uniformLocs: UniformLocations
	) {
		super();
		this.color = new Color([1, 1, 1, 0]);
	}

	public setupStateForDraw(webgl: WebGL2RenderingContext) {
		let modelView = mat4.identity(mat4.create());
		modelView = mat4.translate(
			mat4.create(),
			modelView,
			this.transform.getTranslation().vec3
		);
		modelView = mat4.rotateX(
			mat4.create(),
			modelView,
			this.transform.getRotation().vec3[0]
		);
		modelView = mat4.rotateY(
			mat4.create(),
			modelView,
			this.transform.getRotation().vec3[1]
		);
		modelView = mat4.rotateZ(
			mat4.create(),
			modelView,
			this.transform.getRotation().vec3[2]
		);
		modelView = mat4.scale(
			mat4.create(),
			modelView,
			this.transform.getScale().vec3
		);
		webgl.uniformMatrix4fv(this.uniformLocs["modelView"], false, modelView);
		webgl.uniformMatrix4fv(
			this.uniformLocs["projection"],
			false,
			this.projection
		);
		webgl.uniform4fv(this.uniformLocs["color"], this.color.vec4);
	}

	public setProjection(projection: mat4) {
		this.projection = projection;
	}

	public setColorRgba(colorVector: vec4) {
		this.color = new Color(colorVector);
	}

	public setTexture() {}

	public destroy(): void {
		throw new Error("Method not implemented.");
	}
}

export type UniformLocations = {
	[name: string]: WebGLUniformLocation;
};
