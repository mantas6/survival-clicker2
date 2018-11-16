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
import { GroupedTimer } from '@/components/layout/Sidebar.vue';

@Component
export default class Timer extends Vue {
  @Prop({ required: true })
  data!: GroupedTimer;

  get title() {
    const name = this.data.name.split('.');

    return last(name);
  }

  get value(): string {
    return new Decimal(this.data.value)
      .toString();
  }

  get timeLeft(): string {
    return new Decimal(this.data.duration)
      .minus(this.data.timePassed)
      .toString();
  }
}
</script>
