<template>
  <div>
    <div class="info">{{ $t(`actions.${categoryName}.groups.${groupName}.items.${actionName}.info`) }}</div>
    <div v-for="(mutation, name) of mutations" :key="name" :class="mutationClass(mutation)">
      <div><b>{{ name }}</b></div>
      <span>{{ mutation.diff }}</span>
    </div>
    <div v-for="(effect, name) of effects" :key="name">
      <div><b>{{ name }}</b></div>
      <span>{{ effect.value }}</span>
    </div>
    <div v-for="(effect, name) of timerEffects" :key="name">
      <div><b>{{ name }}</b></div>
      <span>{{ effect.value }}</span>
      <span> {{ $t('for') }} </span>
      <span>{{ effect.duration }}</span>
      <span> {{ $t('seconds') }}</span>
    </div>
    <action-interval v-if="isQueueUnlocked" :item="item"></action-interval>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import ActionInterval from '@/components/layout/Actions/ActionInterval.vue';
import { SerializedActions } from '@/store/actions';

@Component({
  components: { ActionInterval },
})
export default class ActionInfo extends Vue {
  @Getter allActions!: SerializedActions;

  @Prop({ required: true })
  categoryName!: string;

  @Prop({ required: true })
  groupName!: string;

  @Prop({ required: true })
  actionName!: string;

  @Prop({ required: true })
  item!: Action;

  get isQueueUnlocked() {
    return this.allActions.incarnation.automation.interaction.queue.isCalculatedOnce;
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
  .info {
    margin-bottom: 0.5rem;
  }

  .unavailable {
    color: red;
  }

  .warning {
    color: #d0d02b;
  }
</style>
