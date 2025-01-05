import { mat4 } from "gl-matrix";
import { Thing } from "../../core/Thing";
import { Material } from "../common/Material";

export class Mesh3D extends Thing {
	public projection: mat4;

	constructor(
		public programName: string,
		public vao: WebGLVertexArrayObject,
		public count: number,
		public uniformLocs: UniformLocations,
		public material: Material
	) {
		super();
	}

	public setupStateForDraw(webgl: WebGL2RenderingContext) {
		webgl.bindVertexArray(this.vao);
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
		webgl.uniform4fv(this.uniformLocs["color"], this.material.color.rgba);
		this.uniformLocs["u_texture"]
		this.material.texture.setupStateForDraw(webgl);
	}

	public setProjection(projection: mat4) {
		this.projection = projection;
	}

	public setTexture() {}

	public destroy(): void {
		throw new Error("Method not implemented.");
	}
}

export type UniformLocations = {
	[name: string]: WebGLUniformLocation;
};
