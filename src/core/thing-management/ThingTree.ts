// Probs not needed for now, but would be how to track a
export class ThingTree {
	public rootNode: ThingNode;
	public nameMap: StringToThingMap = {};

	public removeThing(name: String) {}
}

export type ThingNode = {
	isRoot: boolean;
	children: ThingNode[];
	parents: ThingNode[];
};

type StringToThingMap = {
	[str: string]: ThingNode;
};
