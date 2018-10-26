import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import {  } from '@/classes/game/base/effects/timers';
import Decimal from 'decimal.js';

interface Timer {
  durationLeft: Decimal;
}

@Module
export class Timers extends VuexModule {
  list: Timer[] = [];

  @Mutation
  updateTimers(timers: Timer[]) {
    this.list = timers;
  }

  // Can not names this 'actions' since it collides with vuex-module-decorators package
  get timers() {
    return this.list;
  }
}
