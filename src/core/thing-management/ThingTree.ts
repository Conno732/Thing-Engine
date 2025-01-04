// Single reference shared by all things.
export class ThingTree {
	public rootNode : ThingNode;
}

export type ThingNode = {
	isRoot: boolean;
	children: ThingNode[];
	parents: ThingNode[];
};
