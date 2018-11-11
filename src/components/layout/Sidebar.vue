<template>
  <aside>
    <div v-for="(timer, index) in timers" :key="index">
      <span>{{ timer.timePassed }} / {{ timer.duration }}</span>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedTimer } from '@/classes/game/base/modifiers/timers';

@Component
export default class Sidebar extends Vue {
  @Getter timers!: { [ index: string ]: SerializedTimer };
}
</script>
