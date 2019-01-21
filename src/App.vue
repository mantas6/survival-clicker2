<template>
  <div id="app" :class="isDarkModeEnabled ? ['dark-mode'] : []">
    <header-container></header-container>
    <main>
      <navigation></navigation>
      <div v-show="!isDead">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
      <death v-show="isDead"></death>
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

  get isDead() {
    return this.globals.isDead;
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
