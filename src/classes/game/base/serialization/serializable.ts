import { StateNode } from '@/classes/game/base/state-node';

export interface SerializedNode {
  [ propertyName: string ]: SerializedNode | string | number;
}

export interface PropertyTagDescriptor {
  tagNames: string[];
  serializationFunc?: (input: any) => string | number;
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
      if (node) {
        if (descriptor.serializationFunc) {
          serialized[name] = descriptor.serializationFunc(node);
          //
        } else {
          serialized[name] = node.serialize(tagName);
        }
      }
    }

    return serialized;
  }

  protected *propertiesWithTag(tagName: TagName): PropertyTagIterator {
    for (const [ name, descriptor ] of this.constructor.descriptorsOfProperties) {
      if (descriptor.tagNames.includes(tagName)) {
        const node = this[name];
        yield { name, node, descriptor };
      }
    }
  }
}
