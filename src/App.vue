<template>
  <div id="app" :class="isDarkModeEnabled ? ['dark-mode'] : []">
    <header-container></header-container>
    <main>
      <navigation></navigation>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </main>
    <sidebar></sidebar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderContainer from '@/components/layout/HeaderContainer.vue';
import Navigation from '@/components/layout/Navigation.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { Getter } from 'vuex-class';

@Component({
  components: { HeaderContainer, Navigation, Sidebar },
})
export default class App extends Vue {
  @Getter isDarkModeEnabled!: boolean;
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
