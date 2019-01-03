<template>
  <section>
    <small>{{ $t(`actions.${categoryName}.groups.${groupName}.title`) }}</small>
    <action-item v-for="(action, actionName) of group"
      :key="actionName"
      :categoryName="categoryName"
      :groupName="groupName"
      :actionName="actionName"
      :item="action">
    </action-item>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ActionItem from '@/components/layout/Actions/ActionItem.vue';

@Component({ components: { ActionItem } })
export default class ActionGroup extends Vue {
  @Prop({ required: true })
  categoryName!: string;

  @Prop({ required: true })
  groupName!: string;

  @Prop({ required: true })
  group!: { [actionName: string]: {} };
}
</script>

<style lang="scss" scoped>
  small {
    color: grey;
  }
</style>
