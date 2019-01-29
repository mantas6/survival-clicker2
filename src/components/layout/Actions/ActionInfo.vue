<template>
  <div>
    <span class="info">{{ $t(`actions.${categoryName}.groups.${groupName}.items.${actionName}.info`) }}</span>
    <div v-for="(mutation, name) of mutations" :key="name" :class="mutationClass(mutation)">
      <div><b>{{ name }}</b></div>
      <span>{{ mutation.diff }}</span>
    </div>
    <div v-for="(effect, name) of effects" :key="name">
      <div><b>{{ name }}</b></div>
      <span>{{ effect.value }}</span>
      <span> for </span>
      <span>{{ effect.duration }}</span>
      <span> seconds</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';

@Component
export default class ActionInfo extends Vue {
  @Prop({ required: true })
  categoryName!: string;

  @Prop({ required: true })
  groupName!: string;

  @Prop({ required: true })
  actionName!: string;

  @Prop({ required: true })
  item!: Action;

  get mutations() {
    const list: { [name: string]: any } = {};

    for (const [ name, value ] of Object.entries(this.item)) {
      if (typeof value === 'object' && value.stat) {
        list[name] = value;
      }
    }

    return list;
  }

  get effects() {
    const list: { [name: string]: any } = {};

    for (const [ name, value ] of Object.entries(this.item)) {
      if (typeof value === 'object' && value.modifier) {
        list[name] = value;
      }
    }

    return list;
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
}
</script>

<style lang="scss" scoped>
  .unavailable {
    color: red;
  }

  .warning {
    color: yellow;
  }
</style>
