import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Measures as StateMeasures } from '@/classes/game/measures';

export type SerializedMeasures = StateMeasures;

@Module
export class Measures extends VuexModule {
  list: StateMeasures = {} as any;

  @Mutation
  updateMeasures(measures: StateMeasures) {
    this.list = measures;
  }

  get measures() {
    return this.list;
  }
}
