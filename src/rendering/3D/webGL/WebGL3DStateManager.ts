import { Material } from "../../common/Material";
import { Texture, TextureType } from "../../common/Texture";
import { Mesh3D, UniformLocations } from "../Mesh3D";

export class WebGL3DStateManager {
	webgl: WebGL2RenderingContext;
	programs: { [key: string]: ProgramData } = {};
	currentProgram: string = null;
	defaultTexture: WebGLTexture;

	constructor(webgl: WebGL2RenderingContext) {
		this.webgl = webgl;
	}

	createTexture(src: string = null, type: TextureType): Texture {
		if (src == null) {
			return new Texture(this.defaultTexture, TextureType.IMAGE);
		}

		const image = new Image();
		image.src = src;
		const texture = this.webgl.createTexture();
		this.webgl.bindTexture(this.webgl.TEXTURE_2D, texture);
		this.webgl.texImage2D(
			this.webgl.TEXTURE_2D,
			0,
			this.webgl.RGBA,
			1,
			1,
			0,
			this.webgl.RGBA,
			this.webgl.UNSIGNED_BYTE,
			new Uint8Array([0, 111, 88, 255])
		);

		const loadFunc = () => {
			this.webgl.bindTexture(this.webgl.TEXTURE_2D, texture);
			this.webgl.texImage2D(
				this.webgl.TEXTURE_2D,
				0,
				this.webgl.RGBA,
				this.webgl.RGBA,
				this.webgl.UNSIGNED_BYTE,
				image
			);
			this.webgl.generateMipmap(this.webgl.TEXTURE_2D);
		};

		image.addEventListener("load", loadFunc);
		image.addEventListener("error", () =>
			console.log("failed to load image", image.src)
		);
		if (image.complete) loadFunc();

		return new Texture(texture, type);
	}

	createMesh3D(
		programName: string,
		vertexArrayDatas: VertexArrayData[],
		vertexIndices: Uint16Array,
		material: Material
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
			this.webgl.enableVertexAttribArray(loc);

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

		return new Mesh3D(
			programName,
			vao,
			vertexIndices.length,
			programData.uniformLocs,
			material
		);
	}

	setUpStateForMeshAndDraw(mesh3D: Mesh3D) {
		this.useProgram(mesh3D.programName);
		this.webgl.bindVertexArray(mesh3D.vao);
		mesh3D.setupStateForDraw(this.webgl);
		this.webgl.drawElements(
			this.webgl.TRIANGLES,
			mesh3D.count,
			this.webgl.UNSIGNED_SHORT,
			0
		);
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

	useProgram(programName: string) {
		if (programName == this.currentProgram) return;
		this.webgl.useProgram(this.programs[programName].program);
		this.currentProgram = programName;
		this.programs[programName].program;
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
