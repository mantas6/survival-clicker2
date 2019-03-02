<template>
  <div>
    <navigation @selectCategory="activeCategory = $event"
      default-category="modules"
      :unseen-categories="unseenCategoryNames"
      :available-categories="availableCategoryNames">
    </navigation>
    <article :class="`category-${activeCategory}`">
      <action-group v-for="(group, groupName) of availableGroups"
        :key="groupName"
        :group="group">
      </action-group>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import ActionGroup from '@/components/layout/Actions/ActionGroup.vue';
import Navigation from '@/components/layout/Navigation.vue';
import { SerializedStats } from '@/store/stats';
import { SerializedActions } from '@/store/actions';
import { pickBy } from '@/utils/method';

@Component({
  components: { ActionGroup, Navigation },
})
export default class Incarnation extends Vue {
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
}
</script>

<style lang="scss" scoped>
  article {
    display: grid;
    grid-gap: 1rem;
    width: 50%;
  }
</style>
