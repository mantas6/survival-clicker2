import { Action } from '.';
import { SerializeOn } from '@/classes/game/base/serialization';
import { Transform } from '../transformable';

export class ToggleAction extends Action {
  @SerializeOn('emit', 'store')
  @Transform('reset', () => undefined)
  isToggledOn?: boolean;

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
    const isPurchased = !this.timesCalculated.isZero();

    return isPurchased && !this.isToggledOn;
  }

  @SerializeOn('emit')
  get canToggleOff(): boolean {
    return this.isToggledOn !== undefined && this.isToggledOn;
  }

  protected onToggleOn(): void {
    //
  }

  protected onToggleOff(): void {
    //
  }
}
