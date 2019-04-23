import { SerializableWithReference } from '@/classes/game/base/serialization';

export interface TransformationDescriptor<Node extends Transformable> {
  tagName: string;
  propertyName: string;
  valueFunc: (node: Node) => any;
  whenFunc?: (node: Node) => boolean;
}

export abstract class Transformable extends SerializableWithReference {
  static transformations: Array<TransformationDescriptor<any>> = [];
  'constructor': typeof Transformable;

  onClock() {
    super.onClock();
    this.transform('clock');
  }

  transform(tagName: string) {
    for (const transformation of this.constructor.transformations) {
      if (transformation.tagName === tagName) {
        if (transformation.whenFunc && !transformation.whenFunc(this)) {
          continue;
        }

        (this as any)[transformation.propertyName] = transformation.valueFunc(this);

        this.emitUpdate();
      }
    }
  }
}
