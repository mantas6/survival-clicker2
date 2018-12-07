import { StateEmitter } from './state-emitter';

export abstract class StateNode {
  static nonChildrenNames: string[] = [];
  'constructor': typeof StateNode;

  @NonChild
  path!: string;

  @NonChild
  name!: string;

  @NonChild
  events = new StateEmitter(this);

  @NonChild
  parent?: StateNode;

  @NonChild
  protected root!: StateNode;

  setParent(parent: StateNode, name: string) {
    this.parent = parent;
    this.name = name;
    this.findRoot();
  }

  emitParent() {
    for (const { node, name } of this.nodes()) {
      node.setParent(this, name);
      node.emitParent();
    }
  }

  *nodes(): IterableIterator<{ node: StateNode, name: string }> {
    for (const { node, name } of this.children<StateNode>(entry => entry instanceof StateNode)) {
      yield { node, name };
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
