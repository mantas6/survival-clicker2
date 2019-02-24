import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module
export class Wheel extends VuexModule {
  position: number = 0;

  @Mutation
  scrollWheelUp() {
    this.position--;
  }

  @Mutation
  scrollWheelDown() {
    this.position++;
  }

  get wheelPosition() {
    return this.position;
  }
}
