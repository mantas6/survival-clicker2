interface WithPrototype {
    prototype: any;
}

/**
 * A decorator to apply mixins to a class
 * @see https://www.typescriptlang.org/docs/handbook/mixins.html
 * @param baseCtors Classes to implement to a base class
 */
export function Implements(...baseCtors: WithPrototype[]) {
    return (derivedCtor: WithPrototype) => {
      for (const baseCtor of baseCtors) {
        for (const name of Object.getOwnPropertyNames(baseCtor.prototype)) {
          derivedCtor.prototype[name] = baseCtor.prototype[name];
        }
      }
    };
}
