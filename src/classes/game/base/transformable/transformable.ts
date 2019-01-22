import { SerializableWithReference } from '@/classes/game/base/serialization';

export interface TransformationDescriptor {
  tagName: string;
  propertyName: string;
  valueFunc: () => any;
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
