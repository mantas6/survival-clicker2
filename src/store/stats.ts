import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

interface StatMap {
  [ name: string ]: StatMap | string | number;
}

@Module
export class Stats extends VuexModule {
  public list: StatMap = {};

  @Mutation
  public updateStats(list: StatMap) {
    this.list = list;
  }
}
