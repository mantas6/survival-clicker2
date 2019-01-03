<template>
  <div
    @mouseenter="markAsSeen(item.fullPath)"
    v-tooltip.right="$t(`actions.${categoryName}.groups.${groupName}.items.${actionName}.info`)"
    class="item"
    :class="!item.isAvailable ? 'unavailable' : ''">
    <div class="head" @click="activate(item.fullPath, 1)">
      <div>
        <span class="name">{{ $t(`actions.${categoryName}.groups.${groupName}.items.${actionName}.title`) }}</span>
        <span class="unseen" v-show="!item.isSeen">*</span>
      </div>
      <number-format class="cost" v-if="item.money" :value="item.money.diff" post-fix="$"></number-format>
    </div>
    <div class="options">
      <span @click="activate(item.fullPath, item.maxMultiplier)" v-show="isMaxAvailable">x{{ item.maxMultiplier }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';
import Decimal from 'decimal.js';
import { Action } from '@/classes/game/base/actions';

@Component
export default class ActionItem extends Vue {
  @Getter relay!: Relay;

  @Prop({ required: true })
  categoryName!: string;

  @Prop({ required: true })
  groupName!: string;

  @Prop({ required: true })
  actionName!: string;

  @Prop({ required: true })
  item!: Action;

  get isMaxAvailable(): boolean {
    return new Decimal(this.item.maxMultiplier).greaterThan(1);
  }

  activate(path: string, multiplier: string) {
    this.relay.emit('action', { path, multiplier });
  }

  markAsSeen(path: string) {
    this.relay.emit('seen', { path });
  }
}
</script>

<style lang="scss" scoped>
  .item {
    user-select: none;
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    padding-left: 0;
    width: 50%;

    .head {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      flex: 1;
    }

    .options {
      margin-left: 0.5rem;
      cursor: pointer;
    }

    .name {
      flex: 1;
    }

    .unseen {
      color: red;
    }

    &.unavailable {
      color: grey;
    }
  }
</style>
