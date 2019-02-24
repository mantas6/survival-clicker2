<template>
  <div class="frame" @mouseleave="leave">
    <div
      @mouseenter="enter(item.fullPath)"
      class="item"
      :class="itemClasses">
      <div class="head" @click="activateOrToggle">
        <div>
          <span class="name">{{ $t(`actions.${item.categoryName}.groups.${item.groupName}.items.${item.actionName}.title`) }}</span>
          <span class="unseen" v-show="!item.isSeen">*</span>
        </div>
        <number-format class="cost" v-if="item.money" :value="item.money.diff" post-fix="$"></number-format>
        <number-format class="cost" v-else-if="item.points" :value="item.points.diff" post-fix="P"></number-format>
      </div>
      <div class="options" v-if="isMultiplierUnlocked">
        <span @click="activeMaxMultiplier" v-show="isMaxAvailable">x{{ item.maxMultiplier }}</span>
        <span @click="toggleFavorite" v-if="item.canBeFavorited">
          <span v-show="item.favorite">F-</span>
          <span v-show="!item.favorite">F+</span>
        </span>
      </div>
    </div>
    <div class="info" v-show="isHovering">
      <action-info :item="item"></action-info>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';
import { SerializedActions } from '@/store/actions';
import Decimal from 'decimal.js';
import { Action, ToggleAction } from '@/classes/game/base/actions';
import ActionInfo from '@/components/layout/Actions/ActionInfo.vue';

@Component({ components: { ActionInfo } })
export default class ActionItem extends Vue {
  @Getter relay!: Relay;
  @Getter allActions!: SerializedActions;

  @Prop({ required: true })
  item!: Action | ToggleAction;

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

    if (this.isToggable) {
      list.push('togglable');

      if ((this.item as ToggleAction).isToggledOn) {
        list.push('toggled-on');
      }
    }

    return list;
  }

  get isToggable(): boolean {
    return (this.item as ToggleAction).canToggleOn || (this.item as ToggleAction).canToggleOff;
  }

  get isMultiplierUnlocked() {
    return this.allActions.incarnation.automation.interaction.multiplier.isToggledOn;
  }

  activateOrToggle() {
    const path = this.item.fullPath;

    if (this.isToggable) {
      this.relay.emit('toggle', { path });
    } else {
      this.activate();
    }
  }

  activeMaxMultiplier() {
    this.relay.emit('action', {
      path: this.item.fullPath,
      multiplier: this.item.maxMultiplier,
    });
  }

  activate() {
    this.relay.emit('action', {
      path: this.item.fullPath,
      multiplier: '1',
    });
  }

  toggleFavorite() {
    if (!this.item.favorite) {
      this.relay.emit('addFavorite', { path: this.item.fullPath });
    } else {
      this.relay.emit('removeFavorite', { path: this.item.fullPath });
    }
  }

  enter(path: string) {
    if (!this.item.isSeen) {
      this.relay.emit('seen', { path });
    }

    this.isHovering = true;
  }

  leave() {
    this.isHovering = false;
  }
}
</script>

<style lang="scss" scoped>
.frame {
    position: relative;
  }

  .info {
    position: absolute;
    background: white;
    border: 1px solid black;
    right: 0;
    z-index: 10;
    min-width: 10rem;
    max-width: 20rem;

    padding: 0.5rem;
    border-radius: 0.75rem;

    .dark-mode & {
      background: black;
    }
  }

  .item {
    user-select: none;
    display: flex;
    justify-content: space-between;
    margin: {
      top: 0.25rem;
      bottom: 0.25rem;
    };
    padding: {
      top: 0.5rem;
      bottom: 0.5rem;
    };

    &.toggled-on {
      background-color: #e0e0e0;

      .dark-mode & {
        background-color: #3c3c3c;
      }
    }

    &.warning .head {
      color: #d0d02b;
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
      .head {
        color: grey;
      }
    }
  }
</style>
