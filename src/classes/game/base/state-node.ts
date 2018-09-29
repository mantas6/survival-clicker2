import { camelCase } from 'lodash';

export abstract class StateNode {
  public static nonChildrenNames: string[] = [];
  public 'constructor': typeof StateNode;

  @NonChild
  protected parent?: StateNode;

  @NonChild
  protected root!: StateNode;

  @NonChild
  protected path!: string;

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

  public isChild<PropertyName extends keyof this>(propertyName: PropertyName): boolean {
    return this.constructor.nonChildrenNames.includes(propertyName as string);
  }

  get name(): string {
    return camelCase(this.constructor.name);
  }

  private findRoot(): void {
    let rootNode: StateNode = this;
    let path = this.name;

    while (rootNode.parent) {
      rootNode = rootNode.parent;
      path = `${rootNode.name}.${path}`;
    }

    this.root = rootNode;
    this.path = path;
  }
}

export function NonChild(nodeClass: StateNode, propertyName: string) {
  const ctor = nodeClass.constructor;

  ctor.nonChildrenNames = [ ...ctor.nonChildrenNames, propertyName ];
}
