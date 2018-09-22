export abstract class StateNode {
  protected parent?: StateNode;
  protected root!: StateNode;

  public setParent(parent: StateNode) {
    this.parent = parent;
    this.findRoot();
  }

  public emitParent() {
    for (const child of this.children()) {
      child.setParent(this);
      child.emitParent();
    }
  }

  public *children(): IterableIterator<StateNode> {
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      const child = (this as any)[propertyName];

      if (child instanceof StateNode) {
        yield child;
      }
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
