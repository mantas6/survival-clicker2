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
  timeLeft: Decimal;
  value: Decimal;
}

@Component({ components: { Timer } })
export default class Sidebar extends Vue {
  @Getter timers!: { [ index: string ]: SerializedTimer };

  // Move this code to back-end?
  get groupedTimers() {
    const grouped: { [effect: string]: GroupedTimer } = {};

    for (const timer of Object.values(this.timers)) {
      const modifierName = timer.effect.modifier.toString();

      const groupedTimer = grouped[modifierName];

      const value = new Decimal(timer.multiplier).mul(timer.effect.value);

      const timeLeft = new Decimal(timer.duration).minus(timer.timePassed);

      if (!groupedTimer) {
        grouped[modifierName] = {
          value,
          timeLeft,
          name: timer.effect.modifier.toString(),
        };
      } else {
        groupedTimer.timeLeft = Decimal.max(groupedTimer.timeLeft, timeLeft);
        groupedTimer.value = groupedTimer.value.add(value);
      }
    }

    return grouped;
  }
}
</script>
