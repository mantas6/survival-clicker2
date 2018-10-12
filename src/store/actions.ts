import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { SerializedMap } from '@/store/types';

@Module
export class Actions extends VuexModule {
  public list: SerializedMap = {};

  @Mutation
  public updateActions(actions: SerializedMap) {
    this.list = actions;
  }

  // Can not names this 'actions' since it collides with vuex-module-decorators package
  get processes() {
    return this.list;
  }
}
