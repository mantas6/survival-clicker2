import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Action } from '@/classes/game/base/actions';

export interface ActionMeta {
  categoryName: string;
  groupName: string;
  actionName: string;
  item: Action;
}

@Module
export class ActionInfo extends VuexModule {
  action?: ActionMeta = undefined;

  @Mutation
  selectAction(action: ActionMeta) {
    this.action = action;
  }

  @Mutation
  deselectAction() {
    this.action = undefined;
  }

  get activeAction(): ActionMeta | undefined {
    return this.action;
  }
}
