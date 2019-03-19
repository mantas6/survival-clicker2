<template>
  <section>
    <div class="descriptor">
      <small>{{ $t(`skills.${groupName}.title`) }}</small>
      <small>{{ $t('level') }}: {{ group.skill.level.value }}</small>
      <small>{{ $t('experience') }}: {{ group.skill.experience.value }} / {{ group.skill.experienceRequired }}</small>
    </div>
    <template v-if="hasPerks">
      <template v-for="(action, actionName) of group">
        <action-item
          v-if="actionName != 'skill'"
          :key="actionName"
          :item="action">
        </action-item>
      </template>
    </template>
    <div v-else class="empty">
      <i>{{ $t('no_perks_unlocked') }}</i>
    </div>
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

  get hasPerks() {
    return Object.keys(this.group).length > 1;
  }
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

  .empty {
    margin-top: 0.75rem;
  }
</style>
