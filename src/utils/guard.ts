type Primitive = string | number | boolean | null | undefined | symbol;

export function isPrimitive(value: any): value is Primitive {
  // @see http://2ality.com/2013/10/typeof-null.html
  if (value === null) {
    return true;
  }

  return ['string', 'number', 'boolean', 'undefined', 'symbol'].includes(typeof value);
}
