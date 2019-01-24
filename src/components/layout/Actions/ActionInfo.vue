<template>
  <div>{{ $t(`actions.${categoryName}.groups.${groupName}.items.${actionName}.info`) }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ActionItem from '@/components/layout/Actions/ActionItem.vue';
import { Action } from '@/classes/game/base/actions';

@Component({ components: { ActionItem } })
export default class ActionInfo extends Vue {
  @Prop({ required: true })
  categoryName!: string;

  @Prop({ required: true })
  groupName!: string;

  @Prop({ required: true })
  actionName!: string;

  @Prop({ required: true })
  item!: Action;
}
</script>

