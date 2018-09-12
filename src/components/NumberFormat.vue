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
  @Prop({ required: true })
  private number!: Decimal;

  @Prop()
  private postFix?: string;

  formatter = new Formatter();

  get formatted(): string {
    return this.formatter.format(this.number);
  }
}
</script>