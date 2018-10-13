<template>
  <div id="app">
    <header-container></header-container>
    <main>
      <navigation></navigation>
      <router-view/>
    </main>
    <aside></aside>
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

}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  html, body, #app {
    height: 100%;
    margin: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  #app {
    display: flex;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 3rem 6rem;
  }

  aside {
    min-width: 5rem;
  }
</style>
