<template>
  <div>
    <div>
      <span @click="toggle">Auto</span>
      <div v-if="item.queued">
        <span>(every {{ item.queued.interval }} s)</span>
        <span @click="increase">+</span>
        <span @click="decrease">-</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';
import { Action } from '@/classes/game/base/actions';
import Decimal from 'decimal.js';

@Component
export default class ActionInterval extends Vue {
  @Getter relay!: Relay;

  @Prop({ required: true })
  item!: Action;

  toggle() {
    if (this.item.queued) {
      this.relay.emit('auto', { path: this.item.fullPath });
    } else {
      this.relay.emit('auto', { path: this.item.fullPath, every: 1 });
    }
  }

  increase() {
    const every = new Decimal(this.item.queued!.interval).add(1).valueOf();

    this.relay.emit('auto', { path: this.item.fullPath, every });
  }

  decrease() {
    const every = new Decimal(this.item.queued!.interval).sub(1).valueOf();

    this.relay.emit('auto', { path: this.item.fullPath, every });
  }
}
</script>

<style lang="scss" scoped>
  span {
    padding: {
      left: 0.5rem;
      right: 0.5rem;
    };
  }
</style>
