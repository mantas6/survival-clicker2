import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Timer as SerializedTimer } from '@/classes/game/base/modifiers/timer';

@Module
export class Timers extends VuexModule {
  list: { [ index: string ]: SerializedTimer } = {};

  @Mutation
  updateTimers(timers: { [ index: string ]: SerializedTimer }) {
    this.list = timers;
  }

  // Can not names this 'actions' since it collides with vuex-module-decorators package
  get timers() {
    return this.list;
  }
}
