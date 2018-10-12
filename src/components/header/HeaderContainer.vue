<template>
  <header>
    <game-logo></game-logo>
    <number-format :value="money"></number-format>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameLogo from './GameLogo.vue';
import { mapGetters } from 'vuex';
import { Stats } from '@/store/stats';
import { SerializedStats } from '@/store/stats';
import { Getter } from 'vuex-class';

@Component({
  components: { GameLogo },
})
export default class HeaderContainer extends Vue {
  @Getter public stats!: SerializedStats;

  get money() {
    if (this.stats.finance) {
      return this.stats.finance.money.current;
    }

    return 0;
  }
}
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    flex-direction: column;
    min-width: 20%;
    height: 100%;
    padding: 1rem;
  }
</style>
