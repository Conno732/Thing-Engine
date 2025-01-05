import { mat4 } from "gl-matrix";
import { WebGL3DStateManager } from "./rendering/3D/webGL/WebGL3DStateManager";
import {
	simple3DMeshAttributeNames,
	simple3DMeshUniformNames,
	simpleFragmentShaderSource,
	simpleVertexIndices,
	simpleVertexShaderSource,
	vertexArrayDatas,
} from "./rendering/3D/resources/simpleGLProgramSpecs";
import { Material } from "./rendering/common/Material";
import { TextureType } from "./rendering/common/Texture";

const canvas = document.createElement("canvas");
canvas.style.width = "100%";
canvas.style.height = "100%";
document.body.appendChild(canvas);
document.body.style.margin = "0px";

const webgl = canvas.getContext("webgl2");
if (!webgl) {
	alert("WebGL not supported");
}
webgl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
webgl.canvas.height = canvas.clientHeight;
webgl.canvas.width = canvas.clientWidth;
webgl.enable(webgl.DEPTH_TEST);
webgl.enable(webgl.CULL_FACE);

const stateManager = new WebGL3DStateManager(webgl);

stateManager.createProgram(
	"simple",
	simpleVertexShaderSource,
	simpleFragmentShaderSource,
	simple3DMeshAttributeNames,
	simple3DMeshUniformNames
);

const texture = stateManager.createTexture(
	"checkerboard.bmp",
	TextureType.IMAGE
);

const texture2 = stateManager.createTexture("box.bmp", TextureType.IMAGE);

const material = new Material(texture);
const material2 = new Material(texture2);

const mesh = stateManager.createMesh3D(
	"simple",
	vertexArrayDatas,
	simpleVertexIndices,
	material
);

const mesh2 = stateManager.createMesh3D(
	"simple",
	vertexArrayDatas,
	simpleVertexIndices,
	material2
);

stateManager.useProgram("simple");

const projection = mat4.perspective(
	mat4.create(),
	(60 * Math.PI) / 180, // fov
	webgl.canvas.width / webgl.canvas.height, // aspect
	0.1, // near
	100 // far
);

mesh.setProjection(projection);
mesh.transform.translate([0, 0, -5]);
mesh2.setProjection(projection);
mesh2.transform.translate([4, 1, -5]);
let lastTime: number | null = null;
let c = 0;

function update(time: number) {
	if (lastTime !== null) {
		webgl.clearColor(0.5, 0.7, 1.0, 1.0);
		webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

		const deltaTime = time - lastTime;
		mesh.transform.translate([0, 0, -0.001 * deltaTime]);

		mesh.transform.eulerRotate([0, 0.001 * deltaTime, 0.001 * deltaTime]);
		mesh2.transform.eulerRotate([0, 0.001 * deltaTime, 0.001 * deltaTime]);

		c = c + 0.001 * deltaTime;
		mesh.material.color.rgba[1] = Math.sin(c);
		stateManager.setUpStateForMeshAndDraw(mesh);
		stateManager.setUpStateForMeshAndDraw(mesh2);
	}

	lastTime = time;
	requestAnimationFrame(update);
}

requestAnimationFrame(update);
