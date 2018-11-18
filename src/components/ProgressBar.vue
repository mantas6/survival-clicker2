<template>
  <div class="progress" :class="variant">
    <div class="bar" :class="isEmpty ? 'empty' : ''" :style="{ width: width + '%' }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Decimal from 'decimal.js';

@Component
export default class ProgressBar extends Vue {
  @Prop({ required: true })
  private max!: Decimal.Value;

  @Prop({ required: true })
  private value!: Decimal.Value;

  @Prop({ default: 'red' })
  private variant!: 'green' | 'red' | 'yellow' | 'blue' | 'cyan';

  get isEmpty(): boolean {
    return this.width.isZero();
  }

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

    .bar {
      height: 100%;
      border-radius: 0.75rem;

      &:not(.empty) {
        min-width: 0.75rem;
      }
    }

    &.red {
      background-color: hsl(3, 100%, 42%);
      .bar {
        background-color: hsl(3, 100%, 57%);
      }
    }

    &.green {
      background-color: hsl(127, 57%, 24%);
      .bar {
        background-color: hsl(127, 57%, 39%);
      }
    }

    &.blue {
      background-color: hsl(216, 79%, 30%);
      .bar {
        background-color: hsl(216, 79%, 50%);
      }
    }

    &.cyan {
      background-color: hsl(182, 74%, 30%);
      .bar {
        background-color: hsl(182, 74%, 50%);
      }
    }

    &.yellow {
      background-color: hsl(44, 73%, 33%);
      .bar {
        background-color: hsl(44, 73%, 53%);
      }
    }
  }
</style>
