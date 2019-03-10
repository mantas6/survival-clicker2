import { Process } from '@/classes/game/base/processes';
import { SerializeOn, UnserializeAs } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { TagName } from '@/classes/game/base/serialization/serializable';
import { Calculable, Mutation, ValidationOptions, CalculationOptions } from '@/classes/game/base/mutations';
import { Transform } from '@/classes/game/base/transformable';
import { Queued } from '@/classes/game/base/automation';
import { Favorite } from './favorite';

export type ConditionFunction<Node> = (action: Node, opts: ValidationOptions) => boolean;

export interface Condition {
  conditionFunc: ConditionFunction<any>;
}

export class Action extends Process {
  static unlockingMutations: string[] = [];
  static unlockingConditions: Condition[] = [];
  static lockingConditions: Condition[] = [];
  static defaultMaxMultiplier = new Decimal(Infinity);
  static isPersistent: boolean = false;
  static canBeFavorited: boolean = true;

  'constructor': typeof Action;

  @SerializeOn('store')
  @Transform<undefined, Action>('reset', () => undefined, action => !action.constructor.isPersistent)
  isUnlocked?: boolean;

  @SerializeOn('store')
  @UnserializeAs(input => new Decimal(input.toString()))
  @Transform<Decimal, Action>('reset', () => new Decimal(0), action => !action.constructor.isPersistent)
  timesCalculated: Decimal = new Decimal(0);

  @SerializeOn('store', 'emit')
  @Transform<undefined, Action>('reset', () => undefined, action => !action.constructor.isPersistent)
  isSeen?: boolean;

  @SerializeOn('store', 'emit')
  @Transform('reset', () => undefined)
  favorite?: Favorite;

  @SerializeOn('emit')
  get canBeFavorited() {
    return this.constructor.canBeFavorited;
  }

  @SerializeOn('emit')
  get isAvailable() {
    const multiplier = new Decimal(1);
    return this.validate({ multiplier });
  }

  @SerializeOn('emit')
  get maxMultiplier(): Decimal {
    let multiplier = new Decimal(this.constructor.defaultMaxMultiplier);
    for (const { node } of this.children<Mutation<any>>(entry => entry instanceof Mutation)) {
      const { maxMultiplier } = node;
      if (maxMultiplier.isFinite() && maxMultiplier.lessThan(multiplier)) {
        multiplier = node.maxMultiplier;
      }
    }

    return multiplier;
  }

  @SerializeOn('emit')
  get hasWarning(): boolean {
    return false;
  }

  @SerializeOn('emit')
  get isCalculatedOnce() {
    return this.timesCalculated.greaterThan(0);
  }

  @SerializeOn('emit')
  get actionName() {
    return this.name;
  }

  @SerializeOn('emit')
  get groupName() {
    if (this.parent) {
      return this.parent.name;
    }
  }

  @SerializeOn('emit')
  get categoryName() {
    if (this.parent && this.parent.parent) {
      return this.parent.parent.name;
    }
  }

  onClock() {
    this.triggerUnlocked();
    this.triggerQueued();
  }

  calculate(opts: CalculationOptions) {
    super.calculate(opts);
    this.timesCalculated = this.timesCalculated.add(opts.multiplier);
  }

  serialize(tagName: TagName) {
    if (tagName === 'store' && this.isUnlocked !== undefined) {
      return super.serialize(tagName);
    } else if (tagName === 'emit' && this.isUnlocked) {
      return super.serialize(tagName);
    }
  }

  protected triggerUnlocked() {
    this.checkUnlock();
    this.checkLock();
  }

  protected triggerQueued() {
    const multiplier = this.state.timeMultiplier;
    const queued = this.favorite && this.favorite.queued;
    if (queued && queued.shouldCalculate({ multiplier })) {
      if (this.validate({ multiplier })) {
        this.calculate({ multiplier });
      }
    }
  }

  private checkUnlock() {
    if (this.isUnlocked !== undefined) {
      // We're only checking for unlocks if action was never unlocked before (value of undefined)
      return;
    }

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

  private checkLock() {
    const { lockingConditions } = this.constructor;

    if (!this.isUnlocked || !lockingConditions.length) {
      // We're only going to lock if action is already unlocked
      return;
    }

    const multiplier = new Decimal(1);

    // Checks if all conditions are met
    for (const condition of lockingConditions) {
      if (!condition.conditionFunc(this, { multiplier })) {
        return;
      }
    }

    // Locks the action
    this.isUnlocked = false;
  }
}
