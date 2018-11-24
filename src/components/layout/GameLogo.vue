<template>
  <div class="logo">
    <span>Survival</span>
    <icon name="logo"></icon>
    <b>2</b>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';

@Component({ components: { Icon } })
export default class GameLogo extends Vue {

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
