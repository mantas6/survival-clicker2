<template>
  <section>
    <small>{{ $t(`actions.${categoryName}.groups.${groupName}.title`) }}</small>
    <action-item v-for="(action, actionName) of group"
      :key="actionName"
      :item="action">
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
    if (this.actionSample) {
      return this.actionSample.categoryName;
    }
  }

  get groupName() {
    if (this.actionSample) {
      return this.actionSample.groupName;
    }
  }

  get actionSample() {
    const actions = Object.values(this.group) as Action[];

    if (actions) {
      const sample = head(actions);

      return sample;
    }
  }
}
</script>

<style lang="scss" scoped>
  small {
    color: grey;
  }
</style>
