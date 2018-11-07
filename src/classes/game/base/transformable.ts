import { SerializableWithReference } from '@/classes/game/base/serialization';
import { State } from '@/classes/game/state';

export interface TransformationDescriptor {
  tagName: string;
  propertyName: string;
  valueFunc: () => any;
}

export function Transform<Target>(tagName: string, valueFunc: () => Target) {
  return (transformableClass: Transformable, propertyName: string) => {
    const ctor = transformableClass.constructor;

    const transformation = { tagName, propertyName, valueFunc };

    ctor.transformations = [ ...ctor.transformations, transformation ];
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
