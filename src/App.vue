<template>
  <div id="app" :class="classes">
    <div v-if="isStaging" class="staging">You are currently running a staging build. Long term stablility of your savegame is not guaranteed. <a :href="stableBuildUrl">Switch to a stable build</a></div>
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

  get isStaging() {
    return process.env.VUE_APP_STAGING_WARNING;
  }

  get stableBuildUrl() {
    return process.env.VUE_APP_STABLE_URL;
  }

  get classes() {
    const list = [];

    if (this.isDarkModeEnabled) {
      list.push('dark-mode');
    }

    if (this.isAlive) {
      list.push('is-alive');
    }

    if (this.globals.isPaused) {
      list.push('is-paused');
    }

    return list;
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';

  #app > .staging {
    background: #c72424;
    color: white;
    position: absolute;
    width: 100%;
    padding: 0.2rem;

    a {
      color: white;
    }
  }
</style>
