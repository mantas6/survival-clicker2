import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Modifiers as StateModifiers } from '@/classes/game/modifiers';

export type SerializedModifiers = StateModifiers;

@Module
export class Modifiers extends VuexModule {
  list: SerializedModifiers = {} as any;

  @Mutation
  updateModifiers(modifiers: SerializedModifiers) {
    this.list = modifiers;
  }

  // Can not names this 'actions' since it collides with vuex-module-decorators package
  get modifiers() {
    return this.list;
  }
}
