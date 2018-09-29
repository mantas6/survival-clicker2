import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { SerializedMap } from '@/store/types';

@Module
export class Stats extends VuexModule {
  public stats: SerializedMap = {};

  @Mutation
  public updateStats(stats: SerializedMap) {
    this.stats = stats;
  }
}
