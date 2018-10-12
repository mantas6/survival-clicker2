<template>
  <div class="progress">
    <div class="bar" :style="{ width: this.width + '%' }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Decimal from 'decimal.js';

@Component
export default class ProgressBar extends Vue {
  @Prop({ required: true })
  private max!: Decimal | number | string;

  @Prop({ required: true })
  private value!: Decimal | number | string;

  get width(): Decimal {
    const value = new Decimal(this.value);
    const max = new Decimal(this.max);

    return value.div(max).mul(100);
  }
}
</script>

<style lang="scss" scoped>
  .progress {
    width: 100%;
    border-radius: 0.75rem;
    background-color: hsl(3, 100%, 42%);

    .bar {
      height: 100%;
      border-radius: 0.75rem;
      background-color: hsl(3, 100%, 57%);
    }
  }
</style>
