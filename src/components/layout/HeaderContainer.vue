<template>
  <header>
    <game-logo></game-logo>
    <div class="info" v-if="stats.finance">
      <div class="money">
        <number-format :value="money"></number-format>
      </div>
      <div class="stats">
        <span>Health</span>
        <progress-bar :value="health.value" :max="health.max"></progress-bar>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameLogo from './GameLogo.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { mapGetters } from 'vuex';
import { Stats } from '@/store/stats';
import { SerializedStats } from '@/store/stats';
import { Getter } from 'vuex-class';
import Decimal from 'decimal.js';

@Component({
  components: { GameLogo, ProgressBar },
})
export default class HeaderContainer extends Vue {
  @Getter public stats!: SerializedStats;

  get money() {
    return this.stats.finance.money.value;
  }

  get health() {
    const { value, max } = this.stats.character.health;
    return { value, max };
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

    .info > * {
      margin-top: 2rem;
    }

    .stats {
      display: grid;
      grid-template-columns: 1fr 66%;
      grid-template-rows: 1fr;
      grid-gap: 0.5rem;
    }

    .money {
      width: 100%;
      padding-right: 1.5vw;
    }
  }
</style>
