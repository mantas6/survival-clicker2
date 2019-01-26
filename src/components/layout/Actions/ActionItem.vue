<template>
  <div class="frame" @mouseleave="leave">
    <div
      @mouseenter="enter(item.fullPath)"
      class="item"
      :class="itemClasses">
      <div class="head" @click="activate(item.fullPath, 1)">
        <div>
          <span class="name">{{ $t(`actions.${categoryName}.groups.${groupName}.items.${actionName}.title`) }}</span>
          <span class="unseen" v-show="!item.isSeen">*</span>
        </div>
        <number-format class="cost" v-if="item.money" :value="item.money.diff" post-fix="$"></number-format>
      </div>
      <div class="options">
        <span @click="activate(item.fullPath, item.maxMultiplier)" v-show="isMaxAvailable">x{{ item.maxMultiplier }}</span>
        <span @click="setAuto">
          <span v-show="!item.queued">{{ $t('auto.off') }}</span>
          <span v-show="item.queued">{{ $t('auto.on') }}</span>
        </span>
      </div>
    </div>
    <action-info
      class="info"
      v-show="isHovering"
      :category-name="categoryName"
      :group-name="groupName"
      :action-name="actionName"
      :item="item">
    </action-info>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';
import Decimal from 'decimal.js';
import { Action } from '@/classes/game/base/actions';
import ActionInfo from '@/components/layout/Actions/ActionInfo.vue';

@Component({ components: { ActionInfo } })
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

  isHovering: boolean = false;

  get isMaxAvailable(): boolean {
    return new Decimal(this.item.maxMultiplier).greaterThan(1);
  }

  get itemClasses() {
    const list = [];

    if (!this.item.isAvailable) {
      list.push('unavailable');
    }

    if (this.item.hasWarning) {
      list.push('warning');
    }

    return list;
  }

  activate(path: string, multiplier: string) {
    this.relay.emit('action', { path, multiplier });
  }

  enter(path: string) {
    this.relay.emit('seen', { path });

    this.isHovering = true;
  }

  leave() {
    this.isHovering = false;
  }

  setAuto() {
    this.relay.emit('auto', { path: this.item.fullPath });
  }
}
</script>

<style lang="scss" scoped>
.frame {
    position: relative;
  }

  .info {
    position: absolute;
    background: black;
    right: 0;
    z-index: 10;
    min-width: 10rem;

    padding: 0.5rem;
    border-radius: 0.75rem;
  }

  .item {
    user-select: none;
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    padding-left: 0;

    &.warning .head {
      color: yellow;
    }

    .head {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      flex: 1;
    }

    .options {
      margin-left: 0.5rem;

      > span {
        border-bottom: 1px solid black;
        cursor: pointer;

        &:not(:first-child) {
          margin-left: 0.25rem;
        }

        .dark-mode & {
          border-color: white;
        }
      }
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
