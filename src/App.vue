<template>
  <div id="app">
    <div>
      <header-container></header-container>
      <main>
        <nav>
          <router-link to="/actions/consumables">Consumables</router-link>
          <router-link to="/actions/jobs">Jobs</router-link>
        </nav>
        <article>
          <router-view/>
        </article>
      </main>
      <aside></aside>
    </div>
    <footer>
      <span>Build time: {{ buildTime }}</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderContainer from '@/components/header/HeaderContainer.vue';

@Component({
  components: { HeaderContainer },
})
export default class App extends Vue {
  buildTime: number = process.env.BUILD_TIME;
}
</script>


<style lang="scss">
  #app > div {
    display: flex;
  }

  nav {
    margin-bottom: 4rem;

    a {
      text-transform: uppercase;
      text-decoration: none;
      color: grey;
      &.router-link-exact-active {
        color: lightblue;
      }
    }
  }
</style>
