import { Mesh3D } from "../Mesh3D";

export class WebGL3DStateManager {
	webgl: WebGL2RenderingContext;
	programs: { [key: string]: ProgramData } = {};
	currentProgram: string = null;

	constructor(webgl: WebGL2RenderingContext) {
		this.webgl = webgl;
	}

	createMesh3D(
		programName: string,
		vertexArrayDatas: VertexArrayData[],
		vertexIndices: Uint16Array
	): Mesh3D {
		const programData = this.programs[programName];
		const vao = this.webgl.createVertexArray();
		this.webgl.bindVertexArray(vao);
		vertexArrayDatas.forEach((vertexArrayData) => {
			const loc = programData.attributeLocs[vertexArrayData.name];
			if (loc === undefined)
				throw new Error(
					`Mismatch on program attributes and supplied attribute data ${vertexArrayData.name}`
				);

			this.webgl.bindBuffer(
				this.webgl.ARRAY_BUFFER,
				this.webgl.createBuffer()
			);
			this.webgl.bufferData(
				this.webgl.ARRAY_BUFFER,
				vertexArrayData.vertices,
				this.webgl.STATIC_DRAW
			);
			const { name, size, type, normalized, stride, offset } =
				vertexArrayData;
			this.webgl.vertexAttribPointer(
				programData.attributeLocs[name],
				size,
				type,
				normalized,
				stride,
				offset
			);
		});

		this.webgl.bindBuffer(
			this.webgl.ELEMENT_ARRAY_BUFFER,
			this.webgl.createBuffer()
		);
		this.webgl.bufferData(
			this.webgl.ELEMENT_ARRAY_BUFFER,
			vertexIndices,
			this.webgl.STATIC_DRAW
		);

		return new Mesh3D(programName, vao, vertexIndices.length);
	}

	setUpStateForMeshAndDraw(mesh3D: Mesh3D) {
		this.useProgram(mesh3D.programName);
		this.webgl.bindVertexArray(mesh3D.vao);
		this.webgl.drawElements(
			this.webgl.TRIANGLES,
			mesh3D.count,
			this.webgl.UNSIGNED_SHORT,
			0
		);
		console.log(mesh3D);
	}

	createProgram(
		programName: string,
		vertexShaderSource: string,
		fragmentShaderSource: string,
		attributeNames: Set<string>,
		uniformNames: Set<string>
	) {
		const vertexShader = this.compileShader(
			vertexShaderSource,
			this.webgl.VERTEX_SHADER
		);
		const fragmentShader = this.compileShader(
			fragmentShaderSource,
			this.webgl.FRAGMENT_SHADER
		);

		const program = this.webgl.createProgram();
		this.webgl.attachShader(program, vertexShader);
		this.webgl.attachShader(program, fragmentShader);
		this.webgl.linkProgram(program);

		if (!this.webgl.getProgramParameter(program, this.webgl.LINK_STATUS)) {
			throw new Error(this.webgl.getProgramInfoLog(program));
		}
		this.webgl.deleteShader(vertexShader);
		this.webgl.deleteShader(fragmentShader);

		const attributeLocs: AttributeLocations = {};
		const uniformLocs: UniformLocations = {};
		attributeNames.forEach((attributeName) => {
			attributeLocs[attributeName] = this.webgl.getAttribLocation(
				program,
				attributeName
			);
		});

		uniformNames.forEach((uniformName) => {
			uniformLocs[uniformName] = this.webgl.getUniformLocation(
				program,
				uniformName
			);
		});

		this.programs[programName] = {
			program,
			attributeLocs,
			uniformLocs,
		};
	}

	private useProgram(programId: string) {
		if (programId == this.currentProgram) return;
		this.webgl.useProgram(this.programs[programId].program);
		this.currentProgram = programId;
	}

	private compileShader(source: string, type: number) {
		const shader = this.webgl.createShader(type);
		this.webgl.shaderSource(shader, source);
		this.webgl.compileShader(shader);
		if (!this.webgl.getShaderParameter(shader, this.webgl.COMPILE_STATUS)) {
			throw new Error(
				`Shader compile error: ${this.webgl.getShaderInfoLog(
					shader
				)} ${this.webgl.deleteShader(shader)}`
			);
		}
		return shader;
	}
}

export type VertexArrayData = {
	vertices: Float32Array;
	name: string;
	size: GLint;
	type: GLenum;
	normalized: GLboolean;
	stride: GLsizei;
	offset: GLintptr;
};

type ProgramData = {
	program: WebGLProgram;
	attributeLocs: AttributeLocations;
	uniformLocs: UniformLocations;
};

type AttributeLocations = {
	[name: string]: number;
};

type UniformLocations = {
	[name: string]: WebGLUniformLocation;
};
