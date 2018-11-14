import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module
export class Settings extends VuexModule {
  darkMode: boolean = true;

  @Mutation
  setDarkMode(isEnabled: boolean) {
    this.darkMode = isEnabled;
  }

  get isDarkModeEnabled(): boolean {
    return this.darkMode;
  }
}
