<template>
  <article>
    <section>
      <div v-for="(action, actionName) of availableActions" :key="actionName" @click="activate(action.fullPath)" class="item">
        <span class="name">{{ actionName }}</span>
        <number-format class="cost" v-if="action.money" :value="action.money.diff" post-fix="$"></number-format>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';
import { getRelay } from '@/global';

@Component
export default class Actions extends Vue {
  @Getter public processes!: SerializedActions;

  get availableActions() {
    if (!this.processes) {
      return;
    }
    const category = this.$route.params.name as 'jobs' | 'consumables';

    return this.processes[category];
  }

  activate(path: string) {
    const relay = getRelay();
    relay.emit('action', { path });
  }
}
</script>

<style lang="scss" scoped>
  article {
    flex: 1;
  }

  section {
    display: grid;
    grid-gap: 1rem;

    .item {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      width: 50%;
      padding: 0.75rem;
      padding-left: 0;
      text-transform: capitalize;
    }
  }
</style>
