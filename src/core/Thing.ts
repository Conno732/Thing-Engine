import { Transform } from "./common/location/Transform";

export abstract class Thing {
	public transform: Transform = new Transform();

	constructor() {}

	public appendChild(thing: Thing) {}

	public appendParent(thing: Thing) {}

	// (should be) called by higher level managment when it leaves the mananagment tree
	public abstract destroy(): void;
}
