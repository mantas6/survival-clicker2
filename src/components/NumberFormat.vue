<template>
  <span>
    <template>{{ formatted }}</template>
    <template v-if="postFix">{{ postFix }}</template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Decimal from 'decimal.js';
import { Formatter } from 'swarm-numberformat';

@Component
export default class NumberFormat extends Vue {

  get formatted(): string {
    const value = new Decimal(this.value);
    return this.formatter.format(value);
  }

  formatter = new Formatter({ maxSmall: 1, sigfigs: 3, flavor: 'short' });

  @Prop({ required: true })
  private value!: Decimal | number | string;

  @Prop()
  private postFix?: string;
}
</script>