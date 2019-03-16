<template>
  <section>
    <div class="descriptor">
      <span>{{ $t(`skills.${groupName}.title`) }}</span>
      <span>Lvl: {{ group.skill.level.value }}</span>
      <span>XP: {{ group.skill.experience.value }} / {{ group.skill.experienceRequired }}</span>
    </div>
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
  .descriptor {
    display: flex;
    
    > * {
      margin-right: 0.5rem;

      &:not(:first-child) {
        color: grey;
      }
    }
  }
</style>
