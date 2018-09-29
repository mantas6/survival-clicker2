// Prototype only, delete
import { Effect } from '@/classes/game/base/effects';

interface ConstructorWithDescriptors {
  [name: string]: any;
}

function prepareDescriptorsOfProperty<
  DecorableConstructor extends ConstructorWithDescriptors,
  DescriptorName extends keyof DecorableConstructor,
  DescriptorsMap extends Map<string, any>
>(ctor: DecorableConstructor, propertyName: string, descriptorsPropertyName: DescriptorName): DescriptorsMap {
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor[descriptorsPropertyName]);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, {});
    // Forwarding the copy to the class
    ctor[descriptorsPropertyName] = descriptors;
  }

  return descriptors as DescriptorsMap;
}

export function Group(groupIndex: number) {
  return (effectClass: Effect, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(effectClass.constructor, propertyName, 'descriptorsOfMutations');
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.groupIndex = groupIndex;
    }
  };
}

export class Decorator<
  DecorableConstructor extends ConstructorWithDescriptors,
  DescriptorName extends keyof DecorableConstructor,
  DescriptorsMap
> {
  private ctor: DecorableConstructor;
  private descriptorsPropertyName: DescriptorName;
  private defaults: DescriptorsMap;

  constructor(ctor: DecorableConstructor, descriptorsPropertyName: DescriptorName, defaults: DescriptorsMap) {
    this.ctor = ctor;
    this.descriptorsPropertyName = descriptorsPropertyName;
    this.defaults = defaults;
  }

  public makePropertyDecorator(descriptorFunc: (descriptors: DescriptorsMap) => void) {
    return (decorableClass: { constructor: DecorableConstructor }, propertyName: string) => {
     // const descriptors: DescriptorsMap = new Map(this.ctor[this.descriptorsPropertyName]);

      // descriptorFunc(descriptors);
    };
  }
}
