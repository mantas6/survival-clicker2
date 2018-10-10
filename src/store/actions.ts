import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { SerializedMap } from '@/store/types';

@Module
export class Actions extends VuexModule {
  public list: SerializedMap = {};

  @Mutation
  public updateActions(actions: SerializedMap) {
    this.list = actions;
  }

  get processes() {
    return this.list;
  }
}
