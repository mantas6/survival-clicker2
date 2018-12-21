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
        <container-stat name="health" :stat="health"></container-stat>
        <container-stat name="energy" :stat="energy"></container-stat>
        <container-stat name="stamina" :stat="stamina"></container-stat>
        <container-stat name="hydration" :stat="hydration"></container-stat>
        <container-stat name="stomach" :stat="stomach"></container-stat>
      </div>
    </div>
    <div class="controls">
      <button @click="pause">
        <template v-if="globals.isPaused">{{ $t('unpause') }}</template>
        <template v-else>{{ $t('pause') }}</template>
      </button>
      <button @click="save">{{ $t('save') }}</button>
    </div>
    <button class="suicide" @click="reset">{{ $t('suicide') }}</button>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameLogo from './GameLogo.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import ContainerStat from '@/components/ContainerStat.vue';
import { SerializedStats } from '@/store/stats';
import { SerializedModifiers } from '@/store/modifiers';
import { SerializedGlobals } from '@/store/globals';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';
import Decimal from 'decimal.js';

@Component({
  components: { GameLogo, ProgressBar, ContainerStat },
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

  save() {
    this.relay.emit('save');
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
