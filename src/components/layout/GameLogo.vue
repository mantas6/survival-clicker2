<template>
  <div class="logo">
    <span>Survival</span>
    <img src="@/assets/logo.svg">
    <b>2</b>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GameLogo extends Vue {

}
</script>

<style lang="scss" scoped>
  .logo {
    width: 100%;
    padding: 0 1.5vw;
    font-size: 3.75vw;

    img {
      height: 4.9875vw;
      margin: 0 -1.1vw 0 -0.75vw;
      transform: translateY(12.5%);
    }
  }
</style>
