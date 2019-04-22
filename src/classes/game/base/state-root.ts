import { Serializable } from '@/classes/game/base/serialization';

type UpdateFunction = (node: Serializable) => void;

export class StateRoot extends Serializable {
  private updateFunc?: UpdateFunction;

  whenUpdated(updateFunc: UpdateFunction) {
    this.updateFunc = updateFunc;
  }

  emitUpdate(origin: Serializable) {
    if (this.updateFunc) {
      this.updateFunc(origin);
    }
  }
}
