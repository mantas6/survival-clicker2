import Decimal from 'decimal.js';
import { SerializableWithReference, SerializeOn } from '@/classes/game/base/serialization';
import { traverse } from '@/utils/node';

export abstract class Modifier extends SerializableWithReference {
  private cachedActions?: any[];

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

    for (const action of this.effectActions()) {
      if (action.isToggledOn) {
        for (const { effect } of action.effects()) {
          cumulated = cumulated.add(effect.compute({ multiplier }));
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

  private effectActions() {
    if (!this.cachedActions) {
      this.cachedActions = [];
      for (const node of traverse(this.actions)) {
        // Should be instanceof ToggleAction check
        // Also should check for running processes and it's effects?
        if ((node as any).timesCalculated) {
          for (const { effect } of (node as any).effects()) {
            if (effect.modifier === this) {
              this.cachedActions.push(node);
            }
          }
        }
      }
    }

    return this.cachedActions;
  }
}
