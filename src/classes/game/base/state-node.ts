export class StateNode {
    protected parent?: StateNode;

    public setParent(parent: StateNode) {
        this.parent = parent;
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
}
