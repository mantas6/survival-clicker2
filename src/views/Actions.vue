<template>
  <article>
    <section>
      <div v-for="(action, actionName) of availableActions"
        :key="actionName"
        @click="activate(action.fullPath, 1)"
        class="item"
        :class="!action.isAvailable ? 'unavailable' : ''">
        <span class="name">{{ actionName | startCase }}</span>
        <span @click="activate(action.fullPath, action.maxMultiplier)">[MAX]</span>
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

@Component({
  filters: { startCase },
  updated(this: Actions) {
    if (this.availableActions && !Object.keys(this.availableActions).length) {
      this.$router.push({ name: 'home' });
    }
  },
})
export default class Actions extends Vue {
  @Getter processes!: SerializedActions;
  @Getter relay!: Relay;

  get availableActions() {
    if (!this.processes) {
      return;
    }
    const category = this.$route.params.name as 'jobs' | 'consumables';

    return this.processes[category];
  }

  activate(path: string, multiplier: string) {
    this.relay.emit('action', { path, multiplier });
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

      .name {
        flex: 1;
      }

      &.unavailable {
        color: grey;
      }
    }
  }
</style>
