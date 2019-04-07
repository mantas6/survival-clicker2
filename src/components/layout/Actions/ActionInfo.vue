<template>
  <div>
    <div class="info">{{ $t(`actions.${item.categoryName}.groups.${item.groupName}.items.${item.actionName}.info`) }}</div>
    <div class="tags">
      <span v-show="isToggable" class="togglable">{{ $t('togglable') }}</span>
    </div>
    <div class="list">
      <div v-for="(mutation, name) of mutations" :key="name" :class="mutationClass(mutation)">
        <div><b>{{ $t(`stats.${name}.title`) }}</b></div>
        <number-format :value="mutation.diff"></number-format>
      </div>
      <div v-for="(effect, name) of effects" :key="name">
        <div><b>{{ $t(`stats.${name}.title`) }}</b></div>
        <number-format :value="effect.value"></number-format>
      </div>
      <div v-for="(effect, name) of timerEffects" :key="name">
        <div><b>{{ $t(`stats.${name}.title`) }}</b></div>
        <div>
          <number-format :value="effect.value"></number-format>
          <span> {{ $t('for') }} </span>
          <number-format :value="effect.duration"></number-format>
          <span> {{ $t('seconds') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Action, ToggleAction } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializedActions } from '@/store/actions';

@Component
export default class ActionInfo extends Vue {
  @Getter allActions!: SerializedActions;

  @Prop({ required: true })
  item!: Action | ToggleAction;

  get isToggable() {
    return (this.item as ToggleAction).isTogglable || false;
  }

  get mutations() {
    return this.filterItems(item => {
      if (item.stat && item.diff !== '0') {
        return true;
      }
    });
  }

  get timerEffects() {
    return this.filterItems(item => {
      if (item.modifier && item.duration && item.value !== '0') {
        return true;
      }
    });
  }

  get effects() {
    return this.filterItems(item => {
      if (item.modifier && !item.duration) {
        if (item.value !== '0' && item.duration !== '0') {
          return true;
        }
      }
    });
  }

  mutationClass(mutation: Mutation<any>) {
    if (!mutation.isAvailable) {
      if (this.item.isAvailable) {
        return 'warning';
      } else {
        return 'unavailable';
      }
    }
  }

  private filterItems(filterFunc: (item: any) => boolean | undefined) {
    const list: { [name: string]: any } = {};

    for (const [ name, item ] of Object.entries(this.item)) {
      if (typeof item === 'object' && filterFunc(item)) {
        list[name] = item;
      }
    }

    return list;
  }
}
</script>

<style lang="scss" scoped>
  .tags {
    margin: {
      top: 0.5rem;
      bottom: 0.5rem;
    };

    .togglable {
      color: #1b6be4;
    }
  }

  .list {
    > div {
      display: flex;
      justify-content: space-between;
    }
  }

  .unavailable {
    color: red;
  }

  .warning {
    color: #d0d02b;
  }
</style>
