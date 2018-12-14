<template>
  <aside>
    <div v-for="process in filteredProcesses" :key="process.fullPath">{{ process.fullPath | split('.') | last }}</div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedProcesses } from '@/store/processes';
import Decimal from 'decimal.js';
import { split, last } from '@/utils/method';

@Component({ filters: { split, last } })
export default class Sidebar extends Vue {
  @Getter processes!: SerializedProcesses;

  // Move this code to back-end?
  get filteredProcesses() {
    const processes = [];

    for (const process of Object.values(this.processes)) {
      processes.push(process);
    }

    return processes;
  }
}
</script>
