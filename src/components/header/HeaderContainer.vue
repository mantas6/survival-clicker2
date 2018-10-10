<template>
  <header>
    <game-logo></game-logo>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameLogo from './GameLogo.vue';

@Component({
  components: { GameLogo },
})
export default class HeaderContainer extends Vue {

}
</script>

