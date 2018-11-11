<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ data.effect.value }}</div>
    <span>{{ data.timePassed }} / {{ data.duration }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Timer as SerializedTimer } from '@/classes/game/base/modifiers/timer';
import { last } from 'lodash';

@Component
export default class Timer extends Vue {
  @Prop({ required: true })
  data!: SerializedTimer;

  get title() {
    const name = this.data.effect.fullPath.split('.');

    return last(name);
  }
}
</script>
