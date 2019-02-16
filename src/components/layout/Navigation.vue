<template>
  <nav>
    <a v-for="category in availableCategories"
      :key="category"
      :class="category == selectedCategory ? 'active' : ''"
      @click.prevent="select(category)">
      <span>{{ $t(`actions.${category}.title`) }}</span>
      <span class="unseen" v-show="unseenCategories.includes(category)">*</span>
    </a>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  @Prop({ required: true })
  availableCategories!: string[];

  @Prop({ required: true })
  unseenCategories!: string[];

  selectedCategory: string = 'jobs';

  select(categoryName: string) {
    this.selectedCategory = categoryName;
    this.$emit('selectCategory', categoryName);
  }
}
</script>

<style lang="scss" scoped>
  nav {
    margin-bottom: 4rem;

    a {
      cursor: pointer;
      text-transform: uppercase;
      text-decoration: none;
      color: grey;

      &.active {
        color: lightblue;
      }

      & + a {
        margin-left: 1.5rem;
      }

      .unseen {
        color: red;
      }
    }
  }
</style>
