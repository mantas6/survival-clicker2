import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { SerializedMap } from '@/store/types';

@Module
export class Processes extends VuexModule {
  public list: SerializedMap = {};

  @Mutation
  public updateProcesses(processes: SerializedMap) {
    this.list = processes;
  }

  get processes() {
    return this.list;
  }
}
