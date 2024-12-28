import { mat4, vec3 } from "gl-matrix";
import { WebGL3DStateManager } from "./rendering/3D/webGL/WebGL3DStateManager";
import {
	simple3DMeshAttributeNames,
	simple3DMeshUniformNames,
	simpleFragmentShaderSource,
	simpleVertexShaderSource,
	simpleVertexIndices,
	vertexArrayDatas,
} from "./rendering/3D/resources/simpleGLProgramSpecs";

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
webgl.clearColor(0.5, 0.7, 1.0, 1.0);
webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
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
const mesh = stateManager.createMesh3D(
	"simple",
	vertexArrayDatas,
	simpleVertexIndices
);

stateManager.useProgram("simple");

const projection = mat4.perspective(
	mat4.create(),
	(60 * Math.PI) / 180, // fov
	webgl.canvas.width / webgl.canvas.height, // aspect
	0.1, // near
	10 // far
);
webgl.uniformMatrix4fv(mesh.uniformLocs["projection"], false, projection);
let modelView = mat4.identity(mat4.create());

modelView = mat4.translate(mat4.create(), modelView, [0, 0, -4]);
modelView = mat4.rotateX(mat4.create(), modelView, 0.9);
modelView = mat4.rotateY(mat4.create(), modelView, 0.5);
modelView = mat4.scale(mat4.create(), modelView, [2, 1, 1]);

webgl.uniformMatrix4fv(mesh.uniformLocs["modelView"], false, modelView);

stateManager.setUpStateForMeshAndDraw(mesh);
