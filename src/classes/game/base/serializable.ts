interface SerializedNode {
  [ propertyName: string ]: SerializedNode | string;
}

interface PropertyTagUnion {
  propertyName: string;
  tagName: string;
}

export abstract class Serializable {
  protected static tagsOfProperties: PropertyTagUnion[] = [];
  protected static tagsOfAllProperties: string[] = [];
  protected 'constructor': typeof Serializable;

  public abstract entries(): IterableIterator<{ name: string, node: Serializable }>;

  public serialize() {
    const serialized: SerializedNode = {};

    for (const { name, node } of this.entries()) {
      serialized[name] = node.serialize();
    }

    return serialized;
  }

  protected getPropertiesByTagName(tagName: string): string[] {
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

export function Serialize(tagName: string) {
  return (serializableClass: any, propertyName: string) => {
    const original = serializableClass.constructor.tagsOfProperties;
    serializableClass.constructor.tagsOfProperties = [ ...original, { propertyName, tagName } ];
  };
}
