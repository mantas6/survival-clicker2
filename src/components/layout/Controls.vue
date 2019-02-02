<template>
  <div class="controls">
    <button @click="pause">
      <template v-if="globals.isPaused">{{ $t('unpause') }}</template>
      <template v-else>{{ $t('pause') }}</template>
    </button>
    <button @click="changeTheme">{{ $t('theme') }}</button>
    <a :href="communityLink" target="_blank">{{ $t('community') }}</a>
    <a :href="sourceLink" target="_blank">{{ $t('source') }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';
import { SerializedGlobals } from '@/store/globals';

@Component
export default class Controls extends Vue {
  @Getter relay!: Relay;
  @Getter globals!: SerializedGlobals;
  @Getter isDarkModeEnabled!: boolean;

  get sourceLink() {
    return process.env.VUE_APP_SOURCE_LINK;
  }

  get communityLink() {
    return process.env.VUE_APP_COMMUNITY_LINK;
  }

  changeTheme() {
    this.$store.commit('setDarkMode', !this.isDarkModeEnabled);
  }

  pause() {
    this.relay.emit('pause');
    this.relay.emit('save');
  }
}
</script>

<style lang="scss" scoped>
  .controls {
    margin-bottom: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 0.5rem;
    margin-right: 1.5vw;

    a {
      text-decoration: none;
      text-align: center;
    }

    button, a {
      background: transparent;
      color: black;
      border: 1px solid black;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      padding: 0.1rem;
      cursor: pointer;

      .dark-mode & {
        color: white;
        border-color: white;
      }
    }
  }
</style>
