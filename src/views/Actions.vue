<template>
  <article>
    <button @click="setMultiplier(1)">x1</button>
    <button @click="setMultiplier(5)">x5</button>
    <button @click="setMultiplier(10)">x10</button>
    <section>
      <div v-for="(action, actionName) of availableActions"
        :key="actionName"
        @click="activate(action.fullPath)"
        class="item"
        :class="!action.isAvailable ? 'unavailable' : ''">
        <span class="name">{{ actionName | startCase }}</span>
        <number-format class="cost" v-if="action.money" :value="action.money.diff" post-fix="$"></number-format>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';
import { Relay } from '@/classes/relay';
import { startCase } from 'lodash';

@Component({ filters: { startCase } })
export default class Actions extends Vue {
  @Getter processes!: SerializedActions;
  @Getter relay!: Relay;

  multiplier: number = 1;

  get availableActions() {
    if (!this.processes) {
      return;
    }
    const category = this.$route.params.name as 'jobs' | 'consumables';

    return this.processes[category];
  }

  activate(path: string) {
    this.relay.emit('action', { path, multiplier: this.multiplier });
  }

  setMultiplier(multiplier: number) {
    this.multiplier = multiplier;
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

      &.unavailable {
        color: grey;
      }
    }
  }
</style>
