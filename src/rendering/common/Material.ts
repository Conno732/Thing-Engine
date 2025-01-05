import { Color } from "../../core/common/Color";
import { Texture } from "./Texture";

export class Material {
	constructor(public texture: Texture, public color: Color = new Color()) {}
}
