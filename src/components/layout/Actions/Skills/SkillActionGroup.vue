<template>
  <section>
    <div class="descriptor">
      <small>{{ $t(`skills.${groupName}.title`) }}</small>
      <small>Lvl: {{ group.skill.level.value }}</small>
      <small>XP: {{ group.skill.experience.value }} / {{ group.skill.experienceRequired }}</small>
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
      color: grey;
    }
  }
</style>
