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

  terminate() {
    const currentPoints = this.stats.incarnation.currentPoints;
    this.stats.incarnation.points.mutate(value => value.add(currentPoints.value));
    currentPoints.current = undefined;
    this.isAlive = false;
  }
}
