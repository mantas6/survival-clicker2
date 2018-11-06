import { SerializableWithReference } from '@/classes/game/base/serialization';

export interface TransformationDescriptor {
  tagName: string;
  propertyName: string;
  valueFunc: () => any;
  conditionFunc: () => boolean;
}

export function Transform<Target>(tagName: string, valueFunc: () => Target, conditionFunc: () => boolean) {
  return (transformableClass: Transformable, propertyName: string) => {
    const ctor = transformableClass.constructor;

    const transformation = { tagName, propertyName, valueFunc, conditionFunc };

    ctor.transformations = [ ...ctor.transformations, transformation ];
  };
}

export class Transformable extends SerializableWithReference {
  static transformations: TransformationDescriptor[] = [];
  'constructor': typeof Transformable;

  transform(tagName: string) {
    for (const transformation of this.constructor.transformations) {
      if (transformation.tagName === tagName && transformation.conditionFunc()) {
        (this as any)[transformation.propertyName] = transformation.valueFunc();
      }
    }
  }
}
