<template>
  <div class="stat">
    <div class="head">
      <span>{{ $t(`stats.${name}.title`) }}</span>
      <small>{{ stat.value }} / {{ stat.max }}</small>
    </div>
    <progress-bar :value="stat.value" :max="stat.max" :variant="progressVariant"></progress-bar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Container } from '@/classes/game/base/stats/container.ts';
import ProgressBar from '@/components/ProgressBar.vue';
import Decimal from 'decimal.js';

@Component({ components: { ProgressBar } })
export default class ContainerStat extends Vue {
  @Prop({ required: true })
  name!: 'health' | 'energy' | 'stamina' | 'hydration' | 'stomach';

  @Prop({ required: true })
  stat!: Container;

  get progressVariant() {
    const variants = {
      health: 'red',
      energy: 'green',
      stamina: 'blue',
      hydration: 'cyan',
      stomach: 'yellow',
    };

    return variants[this.name];
  }
}
</script>

<style lang="scss" scoped>
  .head {
   display: flex;
   justify-content: space-between; 
  }
</style>
