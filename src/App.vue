<template>
  <div id="app">
    <header-container></header-container>
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
import HeaderContainer from '@/components/header/HeaderContainer.vue';

@Component({
  components: { HeaderContainer },
})
export default class App extends Vue {

}
</script>


<style lang="scss">
  #app {
    display: flex;
  }
</style>
