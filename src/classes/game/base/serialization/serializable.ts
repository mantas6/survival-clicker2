import { StateNode } from '@/classes/game/base/state-node';

export interface SerializedNode {
  [ propertyName: string ]: SerializedNode | string | number;
}

export interface PropertyTagDescriptor {
  tagNames: string[];
  serializeFunc?: (input: any) => string | number;
  unserializeFunc?: (input: string | number) => any;
}

export type TagName = 'emit' | 'store';
export type PropertyTagIterator = IterableIterator<{
  name: string,
  node: Serializable,
  descriptor: PropertyTagDescriptor,
}>;

export abstract class Serializable extends StateNode {
  public static descriptorsOfProperties = new Map<string, PropertyTagDescriptor>();
  public 'constructor': typeof Serializable;
  [ propertyName: string ]: any;

  public serialize(tagName: TagName) {
    const serialized: SerializedNode = {};

    for (const { name, node, descriptor } of this.propertiesWithTag(tagName)) {
      if (descriptor.serializeFunc) {
        serialized[name] = descriptor.serializeFunc(node);
      } else {
        serialized[name] = node.serialize(tagName);
      }
    }

    return serialized;
  }

  public unserialize(serialized: SerializedNode) {
    for (const [ name, serializedValue ] of Object.entries(serialized)) {
      const node = this.getPropertyByName(name);

      const descriptor = this.constructor.descriptorsOfProperties.get(name);

      if (typeof serializedValue === 'string' || typeof serializedValue === 'number') {
        if (descriptor && descriptor.unserializeFunc) {
          this[name] = descriptor.unserializeFunc(serializedValue);
        }
      } else if (node) {
        node.unserialize(serializedValue);
      }
    }
  }

  protected *propertiesWithTag(tagName: TagName): PropertyTagIterator {
    for (const [ name, descriptor ] of this.constructor.descriptorsOfProperties) {
      if (descriptor.tagNames.includes(tagName)) {
        const node = this.getPropertyByName(name);

        if (node) {
          yield { name, node, descriptor };
        }
      }
    }
  }

  protected getPropertyByName(propertyName: string): Serializable | undefined {
    return this[propertyName];
  }
}
