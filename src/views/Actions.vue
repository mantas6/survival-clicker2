<template>
  <article>
    <action-group v-for="(group, groupName) of availableGroups" v-if="Object.keys(group).length"
      :key="groupName"
      :groupName="groupName"
      :categoryName="categoryName"
      :group="group">
    </action-group>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';
import ActionGroup from '@/components/layout/Actions/ActionGroup.vue';

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

    return this.allActions[this.categoryName];
  }
}
</script>

<style lang="scss" scoped>
  article {
    display: grid;
    grid-gap: 1rem;
  }
</style>
