import { Serializable } from '@/classes/game/base/serialization';
import { Process } from './process';
import { Calculable } from '@/classes/game/base/effects';

export class ProcessContainer extends Serializable implements Calculable {
  calculate() {
    const filter = (entry: Calculable) => entry instanceof ProcessContainer || entry instanceof Process;
    for (const processChild of this.children(filter)) {
      if (processChild.validate()) {
        processChild.calculate();
      }
    }
  }

  validate() {
    return true;
  }
}
