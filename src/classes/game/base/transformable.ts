import { SerializableWithReference } from '@/classes/game/base/serialization';

export interface TransformationDescriptor {
  tagName: string;
  propertyName: string;
  valueFunc: () => any;
}

/**
 * Sets property value when transformation is called
 * @param tagName transformation tag name
 * @param valueFunc value that will be set on transformation
 */
export function Transform<Target>(tagName: string, valueFunc: () => Target) {
  return (transformableClass: Transformable, propertyName: string) => {
    const ctor = transformableClass.constructor;

    const transformation = { tagName, propertyName, valueFunc };

    ctor.transformations = [ ...ctor.transformations, transformation ];
  };
}

/**
 * Excludes properties from transformation
 * May be used to exclude transformations from parent class
 * @param tagNames tag names to skip
 */
export function SkipTransform(...tagNames: string[]) {
  return (transformableClass: Transformable, propertyName: string) => {
    const ctor = transformableClass.constructor;

    ctor.transformations = ctor.transformations.filter(descriptor => {
      return descriptor.propertyName !== propertyName && tagNames.includes(descriptor.tagName);
    });
  };
}

export abstract class Transformable extends SerializableWithReference {
  static transformations: TransformationDescriptor[] = [];
  'constructor': typeof Transformable;

  transform(tagName: string) {
    for (const transformation of this.constructor.transformations) {
      if (transformation.tagName === tagName) {
        (this as any)[transformation.propertyName] = transformation.valueFunc();
      }
    }
  }
}
