<template>
  <div id="app" :class="classes">
    <header-container></header-container>
    <main>
      <navigation v-show="isAlive"></navigation>
      <div v-show="isAlive">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
      <incarnation v-show="!isAlive"></incarnation>
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
import Incarnation from './views/Incarnation.vue';

@Component({
  components: { HeaderContainer, Navigation, Sidebar, Incarnation },
})
export default class App extends Vue {
  @Getter isDarkModeEnabled!: boolean;
  @Getter globals!: SerializedGlobals;

  get isAlive() {
    return this.globals.isAlive;
  }

  get classes() {
    const list = [];

    if (this.isDarkModeEnabled) {
      list.push('dark-mode');
    }

    if (this.isAlive) {
      list.push('is-alive');
    }

    return list;
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
