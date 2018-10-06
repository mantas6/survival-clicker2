import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { SerializedMap } from '@/store/types';

@Module
export class Stats extends VuexModule {
  public list: SerializedMap = {};

  @Mutation
  public updateStats(stats: SerializedMap) {
    this.list = stats;
  }

  get stats() {
    return this.list;
  }
}
