<template>
  <nav>
    <router-link to="/actions/consumables">Consumables</router-link>
    <router-link to="/actions/jobs">Jobs</router-link>
  </nav>
</template>

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
