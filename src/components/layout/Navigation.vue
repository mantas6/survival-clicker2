<template>
  <nav>
    <router-link to="/actions/consumables">Consumables</router-link>
    <router-link to="/actions/jobs">Jobs</router-link>
    <router-link to="/actions/banking">Banking</router-link>
    <router-link to="/actions/government">Government</router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {

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
