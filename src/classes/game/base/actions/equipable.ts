import { Action } from '.';
import { SerializeOn } from '@/classes/game/base/serialization';

export class Equipable extends Action {
  @SerializeOn('emit', 'store')
  isEquipped: boolean = false;

  equip() {
    this.isEquipped = true;
    this.onEquip();
  }

  unequip() {
    this.isEquipped = false;
    this.onUnequip();
  }

  protected onEquip(): void {
    //
  }

  protected onUnequip(): void {
    //
  }
}
