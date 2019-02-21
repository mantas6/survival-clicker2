<template>
  <div id="app" :class="classes">
    <template v-if="isLoaded">
      <message-container></message-container>
      <header-container></header-container>
      <main>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </main>
      <sidebar></sidebar>
    </template>
    <div v-else>...</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderContainer from '@/components/layout/HeaderContainer.vue';
import Navigation from '@/components/layout/Navigation.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import MessageContainer from '@/components/layout/MessageContainer.vue';
import { Getter } from 'vuex-class';
import { SerializedGlobals } from '@/store/globals';
import { isUpdateAvailable } from '@/utils/version';

@Component({
  components: { HeaderContainer, Sidebar, MessageContainer },
})
export default class App extends Vue {
  @Getter isDarkModeEnabled!: boolean;
  @Getter isLoaded!: boolean;
  @Getter globals!: SerializedGlobals;

  get classes() {
    const list = [];

    if (this.isDarkModeEnabled) {
      list.push('dark-mode');
    }

    if (this.isLoaded) {
      if (this.globals.alive.value) {
        list.push('is-alive');
      } else {
        list.push('is-dead');
      }

      if (this.globals.isPaused) {
        list.push('is-paused');
      }
    }

    return list;
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
