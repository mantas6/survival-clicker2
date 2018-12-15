<template>
  <div>
    <div class="head">
      <span>{{ $t(`stats.${name}.title`) }}</span>
      <div>
        <span class="rate" v-show="hasRate">(<number-format :value="stat.rate"></number-format> / s)</span>
        <number-format :value="stat.value"></number-format>
        <span> / </span>
        <number-format :value="stat.max"></number-format>
      </div>
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

  get hasRate() {
    return !new Decimal(this.stat.rate).isZero();
  }
}
</script>

<style lang="scss" scoped>
  .head {
    display: grid;
    grid-template-columns: 1fr auto;

    :last-child {
      justify-self: right;
    }

    .rate {
      margin-right: 0.25rem;
      color: grey;
    }
  }
</style>
