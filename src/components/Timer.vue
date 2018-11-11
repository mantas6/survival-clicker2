<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ value }}</div>
    <span>{{ timeLeft }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Timer as SerializedTimer } from '@/classes/game/base/modifiers/timer';
import { last } from 'lodash';
import Decimal from 'decimal.js';

@Component
export default class Timer extends Vue {
  @Prop({ required: true })
  data!: SerializedTimer;

  get title() {
    const name = this.data.effect.fullPath.split('.');

    return last(name);
  }

  get value(): string {
    const base = new Decimal(this.data.effect.value);

    return base.times(this.data.multiplier).toString();
  }

  get timeLeft() {
    const duration = new Decimal(this.data.duration);

    return duration.minus(this.data.timePassed).toString();
  }
}
</script>
