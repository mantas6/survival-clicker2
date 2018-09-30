import { camelCase } from 'lodash';

export abstract class StateNode {
  public static nonChildrenNames: string[] = [];
  public 'constructor': typeof StateNode;

  @NonChild
  public path!: string;

  @NonChild
  protected parent?: StateNode;

  @NonChild
  protected root!: StateNode;

  public setParent(parent: StateNode) {
    this.parent = parent;
    this.findRoot();
  }

  public emitParent() {
    for (const child of this.nodes()) {
      child.setParent(this);
      child.emitParent();
    }
  }

  public *nodes(): IterableIterator<StateNode> {
    for (const child of this.children<StateNode>(entry => entry instanceof StateNode)) {
      yield child;
    }
  }

  public *children<T>(filterFunc: (entry: T) => boolean): IterableIterator<T> {
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      const child = (this as any)[propertyName];

      const excludeNames = this.constructor.nonChildrenNames;

      if (!excludeNames.includes(propertyName)) {
        if (filterFunc(child)) {
          yield child;
        }
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
