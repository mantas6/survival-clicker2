import { Action } from '.';
import { SerializeOn } from '@/classes/game/base/serialization';

export class ToggleAction extends Action {
  @SerializeOn('emit', 'store')
  isToggledOn: boolean = false;

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
    return true;
  }

  @SerializeOn('emit')
  get canToggleOff(): boolean {
    return true;
  }

  protected onToggleOn(): void {
    //
  }

  protected onToggleOff(): void {
    //
  }
}
