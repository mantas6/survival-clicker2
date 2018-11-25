import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Actions as StateActions } from '@/classes/game/actions';
import { uniq } from 'lodash';

export type SerializedActions = StateActions;

@Module
export class Actions extends VuexModule {
  list: SerializedActions = {} as any;

  @Mutation
  updateActions(actions: SerializedActions) {
    this.list = actions;
  }

  // Can not names this 'actions' since it collides with vuex-module-decorators package
  get processes() {
    return this.list;
  }

  get availableCategories(): string[] {
    const categories = [];

    if (this.list) {
      for (const [ categoryName, category ] of Object.entries(this.list)) {
        for (const group of Object.values(category)) {
          for (const action of Object.values(group)) {
            if (Object.keys(action)) {
              categories.push(categoryName);
            }
          }
        }
      }
    }

    return uniq(categories);
  }
}
