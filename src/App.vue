<template>
  <div id="app">
    <header>
      <game-logo></game-logo>
    </header>
    <main>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
      <article>
        <router-view/>
      </article>
    </main>
    <aside></aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameLogo from '@/components/GameLogo.vue';

@Component({
  components: { GameLogo },
})
export default class App extends Vue {

}
</script>


<style lang="scss">
  #app {
    display: flex;
  }
</style>
