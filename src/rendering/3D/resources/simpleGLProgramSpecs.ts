import { VertexArrayData } from "../webGL/WebGL3DStateManager";

export const simpleVertexShaderSource = `#version 300 es
in vec4 position;
in vec3 normal;
in vec2 texcoord;

uniform mat4 projection;
uniform mat4 modelView;
uniform mat4 camera;

out vec3 v_normal;
out vec2 v_texcoord;

void main() {
    gl_Position = projection * modelView * position;
    v_normal = mat3(modelView) * normal;
    v_texcoord = texcoord;
}
`;

export const simpleFragmentShaderSource = `#version 300 es
precision highp float;

in vec3 v_normal;
in vec2 v_texcoord;


uniform vec4 color;
uniform sampler2D u_texture;

out vec4 outColor;

void main() {
  outColor = color * texture(u_texture, v_texcoord);
}
`;

const cubeVertexPositions = new Float32Array([
	1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1,
	-1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1,
	1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, -1, 1, 1, -1,
	1, -1, -1, -1, -1, -1,
]);

const cubeVertexNormals = new Float32Array([
	1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
	0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
	0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
]);

const cubeVertexTexcoords = new Float32Array([
	1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
	0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
]);

export const simpleVertexIndices = new Uint16Array([
	0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
	15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
]);

export const vertexArrayDatas: VertexArrayData[] = [
	{
		vertices: cubeVertexPositions,
		name: "position",
		size: 3,
		type: WebGL2RenderingContext.FLOAT,
		normalized: false,
		stride: 0,
		offset: 0,
	},
	{
		vertices: cubeVertexNormals,
		name: "normal",
		size: 3,
		type: WebGL2RenderingContext.FLOAT,
		normalized: false,
		stride: 0,
		offset: 0,
	},
	{
		vertices: cubeVertexTexcoords,
		name: "texcoord",
		size: 2,
		type: WebGL2RenderingContext.FLOAT,
		normalized: false,
		stride: 0,
		offset: 0,
	},
];

export const simple3DMeshAttributeNames = new Set<string>([
	"position",
	"normal",
	"texcoord",
]);

export const simple3DMeshUniformNames = new Set<string>([
	"projection",
	"modelView",
	"color",
	"u_texture",
]);
