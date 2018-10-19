import { camelCase } from 'lodash';

export abstract class StateNode {
  static nonChildrenNames: string[] = [];
  'constructor': typeof StateNode;

  @NonChild
  path!: string;

  @NonChild
  protected parent?: StateNode;

  @NonChild
  protected root!: StateNode;

  setParent(parent: StateNode) {
    this.parent = parent;
    this.findRoot();
  }

  emitParent() {
    for (const node of this.nodes()) {
      node.setParent(this);
      node.emitParent();
    }
  }

  *nodes(): IterableIterator<StateNode> {
    for (const { node } of this.children<StateNode>(entry => entry instanceof StateNode)) {
      yield node;
    }
  }

  *children<T>(filterFunc?: (entry: T) => boolean): IterableIterator<{ node: T, name: string }> {
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      const node = (this as any)[propertyName];

      const excludeNames = this.constructor.nonChildrenNames;

      if (!excludeNames.includes(propertyName)) {
        if (!filterFunc || filterFunc(node)) {
          yield { node, name: propertyName };
        }
      }
    }
  }

  isChild<PropertyName extends keyof this>(propertyName: PropertyName): boolean {
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

      if (rootNode.parent) {
        path = `${rootNode.name}.${path}`;
      }
    }

    this.root = rootNode;
    this.path = path;
  }
}

export function NonChild(nodeClass: StateNode, propertyName: string) {
  const ctor = nodeClass.constructor;

  ctor.nonChildrenNames = [ ...ctor.nonChildrenNames, propertyName ];
}
