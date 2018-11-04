<template>
  <nav>
    <router-link v-for="category in categories" 
      :key="category"
      :to="{ name: 'actions', params: { name: category } }"
      v-show="isUnlocked(category)">{{ category }}
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

  categories = [
    'consumables',
    'drugs',
    'jobs',
    'banking',
  ];

  isUnlocked(name: keyof SerializedActions): boolean {
    if (this.processes[name] && Object.keys(this.processes[name]).length) {
      return true;
    }

    return false;
  }
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
