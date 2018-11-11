<template>
  <div id="app">
    <header-container></header-container>
    <main>
      <navigation></navigation>
      <router-view/>
    </main>
    <sidebar></sidebar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderContainer from '@/components/layout/HeaderContainer.vue';
import Navigation from '@/components/layout/Navigation.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

@Component({
  components: { HeaderContainer, Navigation, Sidebar },
})
export default class App extends Vue {

}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
