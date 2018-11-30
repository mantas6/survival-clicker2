<template>
  <nav>
    <router-link v-for="category in availableCategories" 
      :key="category"
      :to="{ name: 'actions', params: { name: category } }">
      {{ $t(`categories.${category}.title`) }}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SerializedActions } from '@/store/actions';
import { Getter } from 'vuex-class';

@Component
export default class Navigation extends Vue {
  @Getter processes!: SerializedActions;
  @Getter availableCategories!: string[];
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
    }
  }
</style>
