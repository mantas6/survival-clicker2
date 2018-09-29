import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { SerializedMap } from '@/store/types';

@Module
export class Processes extends VuexModule {
  public processes: SerializedMap = {};

  @Mutation
  public updateProcesses(processes: SerializedMap) {
    this.processes = processes;
  }
}
