import { Action } from '.';
import { SerializeOn } from '@/classes/game/base/serialization';
import { Transform } from '@/classes/game/base/transformable';

export class ToggleAction extends Action {
  static isAutoWhenToggled: boolean = false;

  'constructor': typeof ToggleAction;

  @SerializeOn('emit', 'store')
  @Transform<undefined, ToggleAction>('reset', () => undefined, action => !action.constructor.isPersistent)
  isToggledOn?: boolean;

  onClock() {
    super.onClock();
    this.triggerAuto();
  }

  toggleOn() {
    this.isToggledOn = true;
    this.onToggleOn();
  }

  toggleOff() {
    this.isToggledOn = false;
    this.onToggleOff();
  }

  @SerializeOn('emit')
  get canToggleOn(): boolean {
    return this.isCalculatedOnce && !this.isToggledOn;
  }

  @SerializeOn('emit')
  get canToggleOff(): boolean {
    return this.isToggledOn !== undefined && this.isToggledOn;
  }

  protected triggerAuto() {
    const multiplier = this.state.timeMultiplier;
    if (this.constructor.isAutoWhenToggled && this.isToggledOn) {
      if (this.validate({ multiplier })) {
        this.calculate({ multiplier });
      }
    }
  }

  protected onToggleOn(): void {
    //
  }

  protected onToggleOff(): void {
    //
  }
}
