/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { Serializable, SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';
import { expect } from 'chai';

@SerializeAllOn('emit')
class Parent extends Serializable {
  // Should not be serialized when emitting
  @SerializeOn('store')
  baseParam = 'baseValue';

  // Will be serialized in all instances
  genericParam = 'genericValue';
}

describe('serializable.ts', function() {
  const node = new Parent();

  it('does not exist when serialization group is different and overridden with SerializeOn', function() {
    const serialized = node.serialize('emit')!;

    expect(serialized.baseParam).to.not.exist;
  });
});
