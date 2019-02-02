import Decimal from 'decimal.js';
import { SerializableWithReference, SerializeOn } from '@/classes/game/base/serialization';
import { traverse } from '@/utils/node';
import { ToggleAction } from '@/classes/game/base/actions/toggle-action';

export abstract class Modifier extends SerializableWithReference {
  protected abstract compute(cumulated: Decimal): Decimal;

  @SerializeOn('emit')
  get max() {
    return new Decimal(Infinity);
  }

  @SerializeOn('emit')
  get value() {
    const cumulated = new Decimal(0)
      .add(this.sumTimers())
      .add(this.sumToggledActions());

    const computed = this.compute(cumulated);

    return Decimal.min(computed, this.max);
  }

  protected sumToggledActions(): Decimal {
    const multiplier = new Decimal(1);
    let cumulated = new Decimal(0);

    for (const node of traverse(this.actions)) {
      if (node instanceof ToggleAction) {
        if (node.isToggledOn) {
          for (const { effect } of node.effects()) {
            if (effect.modifier === this) {
              cumulated = cumulated.add(effect.compute({ multiplier }));
            }
          }
        }
      }
    }

    return cumulated;
  }

  protected sumTimers(): Decimal {
    let cumulated = new Decimal(0);

    for (const timer of this.state.timers) {
      if (timer.effect.modifier === this) {
        const multiplier = timer.multiplier;
        cumulated = cumulated.add(timer.effect.compute({ multiplier }));
      }
    }

    return cumulated;
  }
}
