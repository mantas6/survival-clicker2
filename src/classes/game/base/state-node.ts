export class StateNode {
    protected parent?: StateNode;
    protected root!: StateNode;

    public setParent(parent: StateNode) {
        this.parent = parent;
        this.findRoot();
    }

    public emitParent() {
        for (const property of this) {
            if (property.setParent) {
                property.setParent(this);
                property.emitParent();
            }
        }
    }

    public *[Symbol.iterator](): IterableIterator<StateNode> {
        for (const propertyName of Object.getOwnPropertyNames(this)) {
            yield (this as any)[propertyName];
        }
    }

    private findRoot(): void {
        let rootNode: StateNode = this;

        while (rootNode.parent) {
            rootNode = rootNode.parent;
        }

        this.root = rootNode;
    }
}
