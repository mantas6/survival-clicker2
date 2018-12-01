<template>
  <article>
    <section>
      <div v-for="(group, groupName) of availableGroups" v-if="Object.keys(group).length" :key="groupName">
        <small>{{ $t(`actions.${category}.groups.${groupName}.title`) }}</small>
        <div v-for="(action, actionName) of group"
          :key="actionName"
          @click="activate(action.fullPath, 1)"
          class="item"
          :class="!action.isAvailable ? 'unavailable' : ''">
          <span class="name">{{ $t(`actions.${category}.groups.${groupName}.items.${actionName}.title`) }}</span>
          <number-format class="cost" v-if="action.money" :value="action.money.diff" post-fix="$"></number-format>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';
import { Relay } from '@/classes/relay';

@Component({
  updated(this: Actions) {
    if (this.availableCategories && !this.availableCategories.includes(this.category)) {
      this.$router.push({ name: 'home' });
    }
  },
})
export default class Actions extends Vue {
  @Getter processes!: SerializedActions;
  @Getter relay!: Relay;
  @Getter availableCategories!: string[];

  get category() {
    return this.$route.params.name as 'jobs' | 'consumables' | 'drugs' | 'investment';
  }

  get availableGroups() {
    if (!this.processes) {
      return;
    }

    return this.processes[this.category];
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

    small {
      color: grey;
    }

    .item {
      cursor: pointer;
      user-select: none;
      display: flex;
      justify-content: space-between;
      width: 50%;
      padding: 0.75rem;
      padding-left: 0;

      .name {
        flex: 1;
      }

      &.unavailable {
        color: grey;
      }
    }
  }
</style>
