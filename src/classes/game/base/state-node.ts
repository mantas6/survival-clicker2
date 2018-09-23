export abstract class StateNode {
  public static nonChildrenNames: string[] = [];
  public 'constructor': typeof StateNode;

  @NonChild
  protected parent?: StateNode;

  @NonChild
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

      const excludeNames = this.constructor.nonChildrenNames;

      if (child instanceof StateNode && !excludeNames.includes(propertyName)) {
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

export function NonChild(nodeClass: StateNode, propertyName: string) {
  const ctor = nodeClass.constructor;

  ctor.nonChildrenNames = [ ...ctor.nonChildrenNames, propertyName ];
}