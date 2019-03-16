<template>
  <section>
    <small>{{ $t(`skills.${groupName}.title`) }}</small>
    <template v-for="(action, actionName) of group">
      <action-item
        v-if="actionName != 'skill'"
        :key="actionName"
        :item="action">
      </action-item>
    </template>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ActionItem from '@/components/layout/Actions/ActionItem.vue';

@Component({ components: { ActionItem } })
export default class ActionGroup extends Vue {
  @Prop({ required: true })
  group!: { [actionName: string]: {} };

  @Prop({ required: true })
  categoryName!: string;

  @Prop({ required: true })
  groupName!: string;
}
</script>

<style lang="scss" scoped>
  small {
    color: grey;
  }
</style>
