import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Actions as StateActions } from '@/classes/game/actions';

export type SerializedActions = StateActions;

@Module
export class Actions extends VuexModule {
  public list: SerializedActions = {} as any;

  @Mutation
  public updateActions(actions: SerializedActions) {
    this.list = actions;
  }

  // Can not names this 'actions' since it collides with vuex-module-decorators package
  get processes() {
    return this.list;
  }
}
