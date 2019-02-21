import { SerializeOn } from '@/classes/game/base/serialization';
import { Transformable, Transform } from '@/classes/game/base/transformable';

export class Alive extends Transformable {
  @Transform('reset', () => true)
  @SerializeOn('store')
  private isAlive: boolean = true;

  @SerializeOn('emit')
  get value() {
    return this.isAlive;
  }

  set value(value) {
    this.isAlive = value;
  }
}
