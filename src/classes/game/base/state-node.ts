export class StateNode {
  protected parent?: StateNode;
  protected root!: StateNode;

  public setParent(parent: StateNode) {
    this.parent = parent;
    this.findRoot();
  }

  public emitParent() {
    for (const property of this.values()) {
      if (property.setParent) {
        property.setParent(this);
        property.emitParent();
      }
    }
  }

  public *values(): IterableIterator<StateNode> {
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      yield (this as any)[propertyName];
    }
  }

  public *entries(): IterableIterator<{ name: string, node: StateNode }> {
    for (const name of Object.getOwnPropertyNames(this)) {
      const node = (this as any)[name];

      yield { name, node };
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
