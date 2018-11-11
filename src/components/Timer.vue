<template>
  <div>
    <div>{{ title }}</div>
    <span>{{ data.timePassed }} / {{ data.duration }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SerializedTimer } from '@/classes/game/base/modifiers/timers';
import { last } from 'lodash';

@Component
export default class Timer extends Vue {
  @Prop({ required: true })
  data!: SerializedTimer;

  get title() {
    const name = this.data.effect.split('.');

    return last(name);
  }
}
</script>
