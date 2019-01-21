<template>
  <div id="app" :class="isDarkModeEnabled ? ['dark-mode'] : []">
    <header-container></header-container>
    <main>
      <navigation v-show="isAlive"></navigation>
      <div v-show="isAlive">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
      <death v-show="!isAlive"></death>
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
import { SerializedGlobals } from '@/store/globals';
import Death from './views/Death.vue';

@Component({
  components: { HeaderContainer, Navigation, Sidebar, Death },
})
export default class App extends Vue {
  @Getter isDarkModeEnabled!: boolean;
  @Getter globals!: SerializedGlobals;

  get isAlive() {
    return this.globals.isAlive;
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
