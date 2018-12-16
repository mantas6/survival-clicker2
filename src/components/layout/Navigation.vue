<template>
  <nav>
    <router-link v-for="category in availableCategories" 
      :key="category"
      :to="{ name: 'actions', params: { name: category } }">
      <span>{{ $t(`actions.${category}.title`) }}</span>
      <span class="unseen" v-show="unseenCategories.includes(category)">*</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class Navigation extends Vue {
  @Getter availableCategories!: string[];
  @Getter unseenCategories!: string[];
}
</script>

<style lang="scss" scoped>
  nav {
    margin-bottom: 4rem;

    a {
      text-transform: uppercase;
      text-decoration: none;
      color: grey;

      &.router-link-exact-active {
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
