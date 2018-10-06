<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: this.width + '%' }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Decimal from 'decimal.js';

@Component
export default class ProgressBar extends Vue {
  @Prop({ required: true })
  private max!: Decimal;

  @Prop({ required: true })
  private current!: Decimal;

  get width(): Decimal {
    return this.current.div(this.max).mul(100);
  }
}
</script>

<style lang="scss" scoped>
  .progress-bar {
    height: 24px;
    width: 100%;
    background: #e0e0e0;
    border: 1px solid #444444;
    border-radius: 5px;
    position: relative;

    .progress {
      position: absolute;
      height: 100%;
      background: #ef5c5c;
    }
  }
</style>
