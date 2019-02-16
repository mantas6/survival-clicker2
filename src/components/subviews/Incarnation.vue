<template>
  <div>
    <navigation @selectCategory="activeCategory = $event"
      :unseen-categories="unseenCategoryNames"
      :available-categories="availableCategoryNames">
    </navigation>
    <article>
      <action-group v-for="(group, groupName) of availableGroups"
        :key="groupName"
        :groupName="groupName"
        :categoryName="activeCategory"
        :group="group">
      </action-group>
    </article>
    <div v-if="stats">
      <span>Incarnation points: </span>
      <number-format :value="incarnationPoints"></number-format>
    </div>
    <button @click="reset">{{ $t('reincarnate') }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import ActionGroup from '@/components/layout/Actions/ActionGroup.vue';
import Navigation from '@/components/layout/Navigation.vue';
import { Relay } from '@/classes/relay';
import { SerializedStats } from '@/store/stats';
import { SerializedActions } from '@/store/actions';
import { pickBy } from '@/utils/method';

@Component({
  components: { ActionGroup, Navigation },
})
export default class Incarnation extends Vue {
  @Getter relay!: Relay;
  @Getter stats!: SerializedStats;
  @Getter allActions!: SerializedActions;

  activeCategory: 'modules' = 'modules';

  get incarnationPoints() {
    return this.stats.incarnation.points.value;
  }

  get availableCategoryNames() {
    if (this.allActions && this.allActions.incarnation) {
      return Object.keys(this.allActions.incarnation);
    }
  }

  get unseenCategoryNames(): string[] {
    const categoriesNames = [];

    if (this.allActions && this.allActions.incarnation) {
      for (const [ categoryName, { hasUnseen } ] of Object.entries(this.allActions.incarnation)) {
        if (hasUnseen) {
          categoriesNames.push(categoryName);
        }
      }
    }

    return categoriesNames;
  }

  get availableGroups() {
    if (!this.allActions || !this.allActions.incarnation) {
      return;
    }

    const groups = this.allActions.incarnation[this.activeCategory];

    return pickBy<{}>(groups, group => Object.keys(group).length);
  }

  reset() {
    this.relay.emit('action', { path: 'actions.other.character.reincarnate', multiplier: 1 });
  }
}
</script>

<style lang="scss" scoped>
  article {
    display: grid;
    grid-gap: 1rem;
    width: 50%;
  }

  button {
    background: transparent;
    color: black;
    border: 1px solid black;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    padding: 0.25rem 1rem;
    cursor: pointer;

    .dark-mode & {
      color: white;
      border-color: white;
    }
  }
</style>
