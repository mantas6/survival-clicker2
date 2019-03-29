<template>
  <div>
    <router-link :to="{ name: 'actions' }" tag="button">Go back</router-link>
    <navigation @selectCategory="activeCategory = $event"
      default-category="general"
      :unseen-categories="unseenCategoryNames"
      :available-categories="availableCategoryNames">
    </navigation>
    <article :class="`category-${activeCategory}`">
      <template>
        <action-group v-for="(group, groupName) of availableGroups"
          :key="groupName"
          :group="group">
        </action-group>
      </template>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';
import ActionGroup from '@/components/layout/Actions/ActionGroup.vue';
import Navigation from '@/components/layout/Navigation.vue';
import { pickBy } from '@/utils/method';

@Component({
  components: { ActionGroup, Navigation },
})
export default class Development extends Vue {
  @Getter allActions!: SerializedActions;

  activeCategory: 'general' = 'general';

  get availableCategoryNames() {
    if (this.allActions && this.allActions.development) {
      return Object.keys(this.allActions.development);
    }
  }

  get unseenCategoryNames(): string[] {
    const categoriesNames = [];

    if (this.allActions && this.allActions.development) {
      for (const [ categoryName, { hasUnseen } ] of Object.entries(this.allActions.development)) {
        if (hasUnseen) {
          categoriesNames.push(categoryName);
        }
      }
    }

    return categoriesNames;
  }

  get availableGroups() {
    if (!this.allActions || !this.allActions.development) {
      return;
    }

    const groups = this.allActions.development[this.activeCategory];

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

  button {
    margin-bottom: 2rem;
  }
</style>
