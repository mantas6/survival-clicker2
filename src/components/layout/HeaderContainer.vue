<template>
  <header>
    <game-logo></game-logo>
    <div class="info" v-if="stats.finance && modifiers.finance">
      <div class="money">
        <div class="current">
          <number-format :value="money" post-fix="$"></number-format>
        </div>
        <div class="income">
          + <number-format :value="moneyGain" post-fix="$"></number-format> / s
        </div>
        <div class="tax">
          @ <number-format :value="tax" post-fix="%"></number-format> tax
        </div>
      </div>
      <div class="stats">
        <div class="head">
          <span>Health</span>
          <number-format :value="health.rate"></number-format>
        </div>
        <progress-bar :value="health.value" :max="health.max"></progress-bar>
        <div class="head">
          <span>Energy</span>
          <number-format :value="energy.rate"></number-format>
        </div>
        <progress-bar :value="energy.value" :max="energy.max" variant="green"></progress-bar>
        <div class="head">
          <span>Stamina</span>
          <number-format :value="stamina.rate"></number-format>
        </div>
        <progress-bar :value="stamina.value" :max="stamina.max" variant="blue"></progress-bar>
        <div class="head">
          <span>Hydration</span>
          <number-format :value="hydration.rate"></number-format>
        </div>
        <progress-bar :value="hydration.value" :max="hydration.max" variant="cyan"></progress-bar>
        <div class="head">
          <span>Stomach</span>
          <number-format :value="stomach.rate"></number-format>
        </div>
        <progress-bar :value="stomach.value" :max="stomach.max" variant="yellow"></progress-bar>
      </div>
    </div>
    <div class="controls">
      <button @click="pause">
        <template v-if="globals.isPaused">{{ $t('unpause') }}</template>
        <template v-else>{{ $t('pause') }}</template>
      </button>
    </div>
    <button class="suicide" @click="reset">{{ $t('suicide') }}</button>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameLogo from './GameLogo.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { SerializedStats } from '@/store/stats';
import { SerializedModifiers } from '@/store/modifiers';
import { SerializedGlobals } from '@/store/globals';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';
import Decimal from 'decimal.js';

@Component({
  components: { GameLogo, ProgressBar },
})
export default class HeaderContainer extends Vue {
  @Getter stats!: SerializedStats;
  @Getter modifiers!: SerializedModifiers;
  @Getter globals!: SerializedGlobals;
  @Getter relay!: Relay;

  get money() {
    return this.stats.finance.money.value;
  }

  get tax() {
    return new Decimal(this.stats.finance.taxes.value).mul(100);
  }

  get health() {
    return this.stats.character.health;
  }

  get energy() {
    return this.stats.character.energy;
  }

  get stamina() {
    return this.stats.character.stamina;
  }

  get hydration() {
    return this.stats.character.hydration;
  }

  get stomach() {
    return this.stats.character.stomach;
  }

  get moneyGain() {
    return this.modifiers.finance.income.value;
  }

  reset() {
    this.relay.emit('reset');
  }

  pause() {
    this.relay.emit('pause');
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

    .info {
      flex: 1;
      > * {
        margin-top: 2rem;
      }
    }

    .stats {
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 1fr;
      grid-gap: 0.5rem;

      .head {
        display: grid;
        grid-template-columns: 1fr 1fr;

        :last-child {
          justify-self: right;
        }
      }
    }

    .money {
      width: 100%;
      padding-right: 1.5vw;

      .current {
        font-size: 2.25rem;
      }

      .income {
        font-size: 1.5rem;
      }

      .tax {
        font-size: 1.25rem;
      }

      > * {
        text-align: right;
      }
    }

    .controls {
      margin-bottom: 0.5rem;
    }

    .suicide {
      text-transform: lowercase;
      margin-right: 1.5vw;
      padding: 0.25rem;
      border: 0.25rem solid hsl(0, 100%, 50%);
      border-radius: 1rem;
      font-size: 2rem;
      text-align: center;
      text-decoration: none;
      background-color: hsl(0, 100%, 50%);
      color: white;
      outline: none;
    }
  }
</style>
