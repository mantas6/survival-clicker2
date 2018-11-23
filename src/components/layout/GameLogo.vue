<template>
  <div class="logo">
    <span>Survival</span>
    <span v-html="content"></span>
    <b>2</b>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  mounted(this: GameLogo) {
    const url = require('@/assets/logo.svg');
    fetch(url)
      .then(res => res.text())
      .then(text => this.content = text);
  }
})
export default class GameLogo extends Vue {
  content = '';

  get img() {
    return require('@/assets/logo.svg');
  }
}
</script>

<style lang="scss">
  .logo {
    width: 100%;
    padding: 0 1.5vw;
    font-size: 3.75vw;

    svg {
      height: 4.9875vw;
      margin: 0 -1.1vw 0 -0.75vw;
      transform: translateY(12.5%);

      .dark-mode & {
        fill: white;
      }
    }
  }
</style>
