<template>
  <aside>
    <timer v-for="(timer, key) in groupedTimers" :key="key" :data="timer"></timer>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Timer as SerializedTimer } from '@/classes/game/base/modifiers/timer';
import Timer from '@/components/Timer.vue';
import Decimal from 'decimal.js';

export interface GroupedTimer {
  name: string;
  duration: Decimal;
  timePassed: Decimal;
  value: Decimal;
}

@Component({ components: { Timer } })
export default class Sidebar extends Vue {
  @Getter timers!: { [ index: string ]: SerializedTimer };

  get groupedTimers() {
    const grouped: { [effect: string]: GroupedTimer } = {};

    for (const timer of Object.values(this.timers)) {
      const modifierName = timer.effect.modifier.toString();

      const groupedTimer = grouped[modifierName];

      const value = new Decimal(timer.multiplier).mul(timer.effect.value);

      if (!groupedTimer) {
        grouped[modifierName] = {
          value,
          duration: new Decimal(timer.duration),
          timePassed: new Decimal(timer.timePassed),
          name: timer.effect.modifier.toString(),
        };
      } else {
        groupedTimer.duration = Decimal.max(groupedTimer.duration, timer.duration);
        groupedTimer.timePassed = Decimal.min(groupedTimer.timePassed, timer.timePassed);
        groupedTimer.value = groupedTimer.value.add(value);
      }
    }

    return grouped;
  }
}
</script>
