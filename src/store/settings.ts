import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module
export class Settings extends VuexModule {
  darkMode: boolean = false;

  @Mutation
  setDarkMode(isEnabled: boolean) {
    this.darkMode = isEnabled;
  }
}
