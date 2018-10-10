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
    display: flex;

    img {
      width: 32px;
      height: 32px;
    }
  }
</style>
