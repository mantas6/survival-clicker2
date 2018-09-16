import { StateNode } from '@/classes/game/base/state-node';

interface SerializedNode {
  [ propertyName: string ]: SerializedNode | string;
}

interface PropertyTagUnion {
  propertyName: string;
  tagName: string;
}

type TagName = 'emit' | 'store';

export abstract class Serializable extends StateNode {
  protected static tagsOfProperties: PropertyTagUnion[] = [];
  protected 'constructor': typeof Serializable;
  [ propertyName: string ]: any;

  public serialize(tagName: TagName) {
    const serialized: SerializedNode = {};

    for (const { name, node } of this.propertiesWithTag(tagName)) {
      if (node) {
        serialized[name] = node.serialize(tagName);
      }
    }

    return serialized;
  }

  protected *propertiesWithTag(tagName: TagName): IterableIterator<{ name: string, node: Serializable }> {
    for (const name of this.getPropertiesByTagName(tagName)) {
      const node = this[name];
      yield { name, node };
    }
  }

  protected getPropertiesByTagName(tagName: TagName): string[] {
    const matchingProperties: string[] = [];
    const unions = this.constructor.tagsOfProperties.filter(d => d.tagName === tagName);

    for (const { propertyName } of unions) {
      if (!matchingProperties.includes(propertyName)) {
        matchingProperties.push(propertyName);
      }
    }

    return matchingProperties;
  }
}

export function Tag(tagName: TagName) {
  return (serializableClass: any, propertyName: string) => {
    const original = serializableClass.constructor.tagsOfProperties;
    serializableClass.constructor.tagsOfProperties = [ ...original, { propertyName, tagName } ];
  };
}
