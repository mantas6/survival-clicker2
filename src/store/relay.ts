import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Relay as RelayRef } from '@/classes/relay';

@Module
export class Relay extends VuexModule {
  ref?: RelayRef;

  @Mutation
  setRelay(relay: RelayRef) {
    this.ref = relay;
  }

  get relay() {
    return this.ref;
  }
}
