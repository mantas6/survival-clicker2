import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Globals as StateGlobals } from '@/classes/game/globals';

export type SerializedGlobals = StateGlobals;

@Module
export class Globals extends VuexModule {
  list: SerializedGlobals = {} as any;
  loaded = false;

  @Mutation
  updateGlobals(globals: SerializedGlobals) {
    this.list = globals;
  }

  @Mutation
  setLoaded() {
    this.loaded = true;
  }

  get globals() {
    return this.list;
  }

  get isLoaded() {
    return this.loaded;
  }
}
