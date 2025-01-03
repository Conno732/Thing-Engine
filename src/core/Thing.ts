import { Rotation } from "./common/Rotation";
import { Scale } from "./common/Scale";
import { Translation } from "./common/Translation";

export class Thing {
	public translation: Translation;
	public scale: Scale;
	public rotation: Rotation;

	constructor() {
		this.translation = new Translation([0, 0, 0]);
		this.scale = new Scale([1, 1, 1]);
		this.rotation = new Rotation([0, 0, 0]);
	}
}
