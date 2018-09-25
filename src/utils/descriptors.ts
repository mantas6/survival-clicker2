export interface DecorateClassConstructor<Descriptor> {
  descriptorsOfProperties: Map<string, Descriptor>;
}

interface ClassWithConstructor {
  constructor: DecorateClassConstructor<any>;
}

export type DescriptorMap<Descriptor> = Map<string, Descriptor>;

export function prepareDescriptorsOfProperty<DecorateClass extends ClassWithConstructor, Descriptor>(
  decorateClass: DecorateClass,
  propertyName: string,
  defaultDescriptors: Descriptor,
): DescriptorMap<Descriptor> {
  const ctor = decorateClass.constructor as DecorateClassConstructor<Descriptor>;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfProperties);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, defaultDescriptors);
    // Forwarding the copy to the class
    ctor.descriptorsOfProperties = descriptors;
  }

  return descriptors;
}
