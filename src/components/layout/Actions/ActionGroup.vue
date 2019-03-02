<template>
  <section>
    <small>{{ $t(`actions.${categoryName}.groups.${groupName}.title`) }}</small>
    <action-item v-for="(action, actionName) of group"
      :key="actionName"
      :item="action">
      <template #options="{ item }">
        <slot name="options" :item="item"></slot>
      </template>
    </action-item>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ActionItem from '@/components/layout/Actions/ActionItem.vue';
import { head } from '@/utils/method';
import { Action } from '@/classes/game/base/actions';

@Component({ components: { ActionItem } })
export default class ActionGroup extends Vue {
  @Prop({ required: true })
  group!: { [actionName: string]: {} };

  get categoryName() {
    const actions = Object.values(this.group) as Action[];

    if (actions) {
      const sample = head(actions);

      if (sample) {
        return sample.categoryName;
      }
    }
  }

  get groupName() {
    const actions = Object.values(this.group) as Action[];

    if (actions) {
      const sample = head(actions);

      if (sample) {
        return sample.groupName;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  small {
    color: grey;
  }
</style>
