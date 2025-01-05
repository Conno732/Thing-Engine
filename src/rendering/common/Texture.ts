export class Texture {
	constructor(private webGlTexture: WebGLTexture, type: TextureType) {}

	setupStateForDraw(webgl: WebGL2RenderingContext) {
		webgl.activeTexture(webgl.TEXTURE0);
		webgl.bindTexture(webgl.TEXTURE_2D, this.webGlTexture);
	}
}

export enum TextureType {
	IMAGE = 0,
	NORMALMAP = 1,
}
