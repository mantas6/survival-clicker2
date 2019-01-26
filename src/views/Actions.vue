<template>
  <div class="container">
    <article>
      <action-group v-for="(group, groupName) of availableGroups"
        :key="groupName"
        :groupName="groupName"
        :categoryName="categoryName"
        :group="group">
      </action-group>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';
import ActionGroup from '@/components/layout/Actions/ActionGroup.vue';
import { pickBy } from '@/utils/method';

@Component({
  components: { ActionGroup },

  updated(this: Actions) {
    if (this.availableCategories && !this.availableCategories.includes(this.categoryName)) {
      this.$router.push({ name: 'home' });
    }
  },
})
export default class Actions extends Vue {
  @Getter availableCategories!: string[];
  @Getter allActions!: SerializedActions;

  get categoryName() {
    return this.$route.params.name as 'jobs' | 'consumables' | 'drugs' | 'investment';
  }

  get availableGroups() {
    if (!this.allActions) {
      return;
    }

    const groups = this.allActions[this.categoryName];

    return pickBy<{}>(groups, group => Object.keys(group).length);
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  article {
    display: grid;
    grid-gap: 1rem;
  }
</style>
