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

    if (value.lessThan(1) && value.greaterThan(-1)) {
      return value.toDecimalPlaces(2).valueOf();
    }

    return this.formatter.format(value);
  }

  formatter = new Formatter({ flavor: 'short' });

  @Prop({ required: true })
  private value!: Decimal.Value;

  @Prop()
  private postFix?: string;
}
</script>