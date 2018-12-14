import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Process } from '@/classes/game/base/processes';

export interface SerializedProcesses {
  [ index: string ]: Process;
}

@Module
export class Processes extends VuexModule {
  list: SerializedProcesses = {};

  @Mutation
  updateProcesses(processes: SerializedProcesses) {
    this.list = processes;
  }

  get processes() {
    return this.list;
  }
}
