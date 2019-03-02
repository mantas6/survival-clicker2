<template>
  <div>
    <span class="toggle" @click="toggle">Auto</span>
    <div v-if="queued">
      <span>(every {{ queued.interval }} s)</span>
      <span @click="increase">+</span>
      <span @click="decrease">-</span>
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

  get queued() {
    return this.item.favorite && this.item.favorite.queued;
  }

  toggle() {
    if (this.queued) {
      this.relay.emit('auto', { path: this.item.fullPath });
    } else {
      this.relay.emit('auto', { path: this.item.fullPath, every: 1 });
    }
  }

  increase() {
    const every = new Decimal(this.queued!.interval).add(1).valueOf();

    this.relay.emit('auto', { path: this.item.fullPath, every });
  }

  decrease() {
    const every = new Decimal(this.queued!.interval).sub(1).valueOf();

    this.relay.emit('auto', { path: this.item.fullPath, every });
  }
}
</script>

<style lang="scss" scoped>
  div {
    display: flex;
  }

  .toggle {
    border-bottom: 1px solid black;
    margin-left: 0.25rem;

    .dark-mode & {
      border-color: white;
    }
  }

  span {
    padding: {
      left: 0.5rem;
      right: 0.5rem;
    };
  }
</style>
