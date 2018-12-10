import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Globals as StateGlobals } from '@/classes/game/globals';

export type SerializedGlobals = StateGlobals;

@Module
export class Globals extends VuexModule {
  list: SerializedGlobals = {} as any;

  @Mutation
  updateGlobals(globals: SerializedGlobals) {
    this.list = globals;
  }

  get globals() {
    return this.list;
  }
}
