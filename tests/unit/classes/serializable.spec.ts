import { Serializable } from '@/classes/game/base/serialization/serializable';
import { expect } from 'chai';

class MyClass extends Serializable {

}

describe('test serializable class', () => {
  it('exists', () => {
    const ser = new MyClass();
    expect(ser).has.property('serialize');
  });
});
