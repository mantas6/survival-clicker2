export class StateNode {
    protected parent?: StateNode;

    constructor() {
        /**
         * Forcing the code to be executed after classes that extends this (constructors)
         * Looking for a better solution
         */
        setImmediate(() => {
            this.emitParent();
        });
    }

    public setParent(parent: StateNode) {
        this.parent = parent;
    }

    public emitParent() {
        for (const property of this) {
            if (property.setParent) {
                property.setParent(this);
            }
        }
    }

    public *[Symbol.iterator](): IterableIterator<StateNode> {
        for (const propertyName of Object.getOwnPropertyNames(this)) {
            yield (this as any)[propertyName];
        }
    }
}
