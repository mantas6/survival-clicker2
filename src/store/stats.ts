import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Stats as StateStats } from '@/classes/game/stats';

export type SerializedStats = StateStats;

@Module
export class Stats extends VuexModule {
  list: SerializedStats = {} as any;

  @Mutation
  updateStats(stats: SerializedStats) {
    this.list = stats;
  }

  get stats() {
    return this.list;
  }
}
