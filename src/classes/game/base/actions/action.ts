import { Process } from '@/classes/game/base/processes';
import { SerializeOn, SerializeAllOn, UnserializeAs } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { TagName } from '@/classes/game/base/serialization/serializable';
import { Calculable, Mutation, ValidationOptions, CalculationOptions } from '@/classes/game/base/mutations';
import { Transform } from '@/classes/game/base/transformable';

export type ConditionFunction = (action: Action, opts: ValidationOptions) => boolean;

export interface Condition {
  conditionFunc: ConditionFunction;
}

export class Action extends Process {
  static unlockingMutations: string[] = [];
  static unlockingConditions: Condition[] = [];
  static visibilityConditions: Condition[] = [];
  'constructor': typeof Action;

  @SerializeOn('store')
  @Transform('reset', () => false)
  isUnlocked: boolean = false;

  @SerializeOn('store')
  @UnserializeAs(input => new Decimal(input.toString()))
  @Transform('reset', () => new Decimal(0))
  timesCalculated: Decimal = new Decimal(0);

  @SerializeOn('emit')
  get isAvailable() {
    const multiplier = new Decimal(1);
    return this.validate({ multiplier });
  }

  @SerializeOn('emit')
  get maxMultiplier(): Decimal {
    let multiplier = new Decimal(Infinity);
    for (const { node } of this.children<Mutation<any>>(entry => entry instanceof Mutation)) {
      const { maxMultiplier } = node;
      if (maxMultiplier.isFinite() && maxMultiplier.lessThan(multiplier)) {
        multiplier = node.maxMultiplier;
      }
    }

    return multiplier;
  }

  calculate(opts: CalculationOptions) {
    super.calculate(opts);
    this.timesCalculated = this.timesCalculated.add(opts.multiplier);
  }

  serialize(tagName: TagName) {
    if (this.isUnlocked && this.isVisible()) {
      return super.serialize(tagName);
    }
  }

  triggerUnlocked() {
    if (!this.isUnlocked) {
      const { unlockingMutations, unlockingConditions } = this.constructor;
      const multiplier = new Decimal(1);

      // Checks if all conditions are met
      for (const condition of unlockingConditions) {
        if (!condition.conditionFunc(this, { multiplier })) {
          return;
        }
      }

      // Checks if required mutations are do-able
      for (const name of unlockingMutations) {
        const mutation = (this as any)[name] as Calculable;

        if (!mutation.validate({ multiplier })) {
          return;
        }
      }

      // Unlocks the action
      this.isUnlocked = true;
    }
  }

  private isVisible(): boolean {
    const multiplier = new Decimal(1);

    for (const { conditionFunc } of this.constructor.visibilityConditions) {
      if (!conditionFunc(this, { multiplier })) {
        return false;
      }
    }

    return true;
  }
}
