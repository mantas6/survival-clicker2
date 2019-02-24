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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { head, last } from '@/utils/method';

enum ScrollDirection {
  Up = -1,
  Down = 1,
}

@Component
export default class Navigation extends Vue {
  @Getter wheelPosition!: number;

  @Prop({ required: true })
  availableCategories!: string[];

  @Prop({ required: true })
  unseenCategories!: string[];

  @Prop({ required: true })
  defaultCategory!: string;

  selectedCategory: string = this.defaultCategory;

  select(categoryName: string) {
    this.selectedCategory = categoryName;
    this.$emit('selectCategory', categoryName);
  }

  @Watch('wheelPosition')
  onWheelChanged(value: number, oldValue: number) {
    let category: string | undefined;

    if (value > oldValue) {
      category = this.scrollCategory(ScrollDirection.Down);
    } else {
      category = this.scrollCategory(ScrollDirection.Up);
    }

    if (category) {
      this.select(category);
    }
  }

  private scrollCategory(direction: ScrollDirection): string | undefined {
    const index = this.availableCategories.indexOf(this.selectedCategory) + direction;

    if (index >= this.availableCategories.length) {
      return head(this.availableCategories);
    } else if (index < 0) {
      return last(this.availableCategories);
    } else {
      return this.availableCategories[index];
    }
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
