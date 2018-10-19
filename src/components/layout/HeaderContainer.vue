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
        <span>Health</span>
        <progress-bar :value="health.value" :max="health.max"></progress-bar>
        <span>Energy</span>
        <progress-bar :value="energy.value" :max="energy.max" variant="green"></progress-bar>
        <span>Stamina</span>
        <progress-bar :value="stamina.value" :max="stamina.max" variant="blue"></progress-bar>
        <span>Hydration</span>
        <progress-bar :value="hydration.value" :max="hydration.max" variant="cyan"></progress-bar>
        <span>Stomach</span>
        <progress-bar :value="stomach.value" :max="stomach.max" variant="yellow"></progress-bar>
      </div>
    </div>
    <button class="suicide" @click="reset">suicide</button>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameLogo from './GameLogo.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { SerializedStats } from '@/store/stats';
import { SerializedModifiers } from '@/store/modifiers';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';

@Component({
  components: { GameLogo, ProgressBar },
})
export default class HeaderContainer extends Vue {
  @Getter stats!: SerializedStats;
  @Getter modifiers!: SerializedModifiers;
  @Getter relay!: Relay;

  get money() {
    return this.stats.finance.money.value;
  }

  get tax() {
    return this.stats.finance.taxes.value;
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
    return this.modifiers.finance.moneyGain.value;
  }

  reset() {
    this.relay.emit('reset');
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
      grid-template-columns: 1fr 66%;
      grid-template-rows: 1fr;
      grid-gap: 0.5rem;
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

    .suicide {
      margin-right: 1.5vw;
      padding: 0.25rem;
      border: 0.25rem solid hsl(0, 100%, 50%);
      border-radius: 1rem;
      font-size: 2rem;
      text-align: center;
      text-decoration: none;
      background-color: hsl(0, 100%, 50%);
      color: white;
    }
  }
</style>
