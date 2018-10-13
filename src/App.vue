<template>
  <div id="app">
    <div>
      <header-container></header-container>
      <main>
        <navigation></navigation>
        <router-view/>
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
import HeaderContainer from '@/components/layout/HeaderContainer.vue';
import Navigation from '@/components/layout/Navigation.vue';

@Component({
  components: { HeaderContainer, Navigation },
})
export default class App extends Vue {
  public buildTime: number = process.env.BUILD_TIME;
}
</script>

<style lang="scss">
  body {
    font-family: 'Roboto', sans-serif;
  }

  #app > div {
    display: flex;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 3rem 6rem;
  }
</style>
