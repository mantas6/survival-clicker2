<template>
  <div id="app" :class="classes">
    <div v-if="isUpdateAvailable" class="update">Update is available. <a href="#" @click.prevent="reload">Reload to update</a></div>
    <div v-else-if="isStaging" class="staging">You are currently running a staging build. Long term stablility of your savegame is not guaranteed. <a :href="stableBuildUrl">Switch to a stable build</a></div>
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
import { isUpdateAvailable } from '@/utils/version';
import Incarnation from './views/Incarnation.vue';

@Component({
  components: { HeaderContainer, Navigation, Sidebar, Incarnation },
  async created(this: App) {
    this.isUpdateAvailable = await isUpdateAvailable();
  },
})
export default class App extends Vue {
  @Getter isDarkModeEnabled!: boolean;
  @Getter globals!: SerializedGlobals;

  isUpdateAvailable: boolean = false;

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
    } else {
      list.push('is-dead');
    }

    if (this.globals.isPaused) {
      list.push('is-paused');
    }

    return list;
  }

  reload() {
    location.reload();
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';

  #app {
    > .staging {
      @include top-message(#c72424, white);
    }

    > .update {
      @include top-message(#ffea31, black);
    }
  }
</style>
