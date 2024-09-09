import { WebGL3DStateManager } from "./rendering/3D/webGL/WebGL3DStateManager";
import {
	simple3DMeshAttributeNames,
	simple3DMeshUniformNames,
	simpleFragmentShaderSource,
	simpleVertexShaderSource,
	cubeVertexIndices,
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

webgl.viewport(0, 0, canvas.width, canvas.height);
webgl.clearColor(1.0, 0.0, 0.0, 1.0);
webgl.clear(webgl.COLOR_BUFFER_BIT);

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
	cubeVertexIndices
);

stateManager.setUpStateForMeshAndDraw(mesh);
