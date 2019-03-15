/* tslint:disable:new-parens */

import { Transformable } from '@/classes/game/base/transformable';
import { Value } from '.';
import Decimal from 'decimal.js';
import { SerializeOn } from '@/classes/game/base/serialization';

export abstract class Skill extends Transformable {
  @SerializeOn('emit', 'store')
  level = new (class Level extends Value {
    readonly default = 1;
  });

  @SerializeOn('emit', 'store')
  experience = new (class Experience extends Value {
    readonly default = 0;
  });

  onClock() {
    super.onClock();
    this.checkLevelUp();
  }

  protected checkLevelUp() {
    if (this.experience.value.greaterThanOrEqualTo(this.experienceRequired)) {
      this.level.mutate(value => value.add(1));
      this.experience.mutate(value => value.sub(value));
    }
  }

  @SerializeOn('emit')
  get experienceRequired(): Decimal {
    return this.level.value.pow(3).add(100);
  }
}
