import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Process } from './process';
import { Calculable } from '@/classes/game/base/effects';

export class ProcessContainer extends SerializableWithReference implements Calculable {
  calculate() {
    const multiplier = this.state.timeMultiplier;
    const filter = (entry: Calculable) => entry instanceof ProcessContainer || entry instanceof Process;
    for (const { node: processChild } of this.children(filter)) {
      if (processChild.validate({ multiplier })) {
        processChild.calculate({ multiplier });
      }
    }
  }

  validate() {
    return true;
  }
}
