<template>
  <header>
    <game-logo></game-logo>
    <div class="info">
      <div class="stats">
        <div class="temperature">
          <div class="current" v-show="isTemperatureUnlocked">
            <span>{{ temperature }}C</span>
          </div>
          <div class="diff" v-show="isTemperatureUnlocked">
            <span v-show="isTemperatureRatePositive">+</span>
            <span v-show="isTemperatureRateNegative">-</span>
            <span>{{ temperatureDiff }}</span>
          </div>
        </div>
        <div class="money">
          <div class="current">
            <number-format :value="money" post-fix="$"></number-format>
          </div>
          <div class="income">
            + <number-format :value="moneyGain" post-fix="$"></number-format> / s
          </div>
          <div class="tax" v-show="isTaxesUnlocked">
            @ <number-format :value="tax" post-fix="%"></number-format> tax
          </div>
        </div>
      </div>
      <div class="containers">
        <container-stat name="health" :stat="health"></container-stat>
        <container-stat name="energy" :stat="energy"></container-stat>
        <container-stat name="stamina" :stat="stamina"></container-stat>
        <container-stat name="hydration" :stat="hydration"></container-stat>
        <container-stat name="stomach" :stat="stomach"></container-stat>
      </div>
      <div class="incarnation" v-show="isIncarnationPointsUnlocked">
        <div class="points">
          <number-format :value="incarnationCurrentPoints"></number-format>
          <span> / </span>
          <number-format :value="incarnationTotalPoints"></number-format>
        </div>
      </div>
    </div>
    <small class="version">{{ version }}</small>
    <controls></controls>
    <button v-show="isAlive" class="suicide" @click="suicide">{{ $t('suicide') }}</button>
    <button v-show="!isAlive" class="reincarnate" @click="reincarnate">{{ $t('reincarnate') }}</button>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameLogo from './GameLogo.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import ContainerStat from '@/components/ContainerStat.vue';
import Controls from '@/components/layout/Controls.vue';
import { SerializedStats } from '@/store/stats';
import { SerializedMeasures } from '@/store/measures';
import { SerializedGlobals } from '@/store/globals';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';
import Decimal from 'decimal.js';
import { SerializedActions } from '@/store/actions';
import { take } from '@/utils/method';

@Component({
  components: { GameLogo, ProgressBar, ContainerStat, Controls },
})
export default class HeaderContainer extends Vue {
  @Getter stats!: SerializedStats;
  @Getter allActions!: SerializedActions;
  @Getter measures!: SerializedMeasures;
  @Getter relay!: Relay;
  @Getter globals!: SerializedGlobals;

  get version() {
    return process.env.VUE_APP_VERSION;
  }

  get money() {
    return this.stats.finance.money.value;
  }

  get tax() {
    return new Decimal(this.stats.finance.taxes.value).mul(100);
  }

  get temperature() {
    return new Decimal(this.stats.character.temperature.value).toSignificantDigits(3).toString();
  }

  get temperatureDiff() {
    return new Decimal(this.stats.character.temperature.rate)
      .abs()
      .toSignificantDigits(2)
      .toString();
  }

  get isTemperatureRatePositive() {
    return new Decimal(this.stats.character.temperature.rate).greaterThan(0);
  }

  get isTemperatureRateNegative() {
    return new Decimal(this.stats.character.temperature.rate).lessThan(0);
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
    return this.measures.finance.income.value;
  }

  get isIncarnationPointsUnlocked() {
    return this.incarnationCurrentPoints.greaterThanOrEqualTo(1) || this.incarnationTotalPoints.greaterThanOrEqualTo(1);
  }

  get incarnationCurrentPoints() {
    return new Decimal(this.stats.incarnation.currentPoints.value);
  }

  get incarnationTotalPoints() {
    return new Decimal(this.stats.incarnation.points.total);
  }

  get isAlive() {
    return this.globals.alive.value;
  }

  get isTemperatureUnlocked() {
    return take(() => this.allActions.incarnation.modules.character.temperature.isToggledOn);
  }

  get isTaxesUnlocked() {
    return take(() => this.allActions.incarnation.modules.finance.taxes.isToggledOn);
  }

  suicide() {
    this.relay.emit('action', { path: 'actions.other.character.suicide', multiplier: 1 });
  }

  reincarnate() {
    this.relay.emit('action', { path: 'actions.other.character.reincarnate', multiplier: 1 });
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

    .temperature, .money, .containers {
      .is-dead & {
        display: none;
      }
    }

    .containers {
      display: grid;
      grid-gap: 0.5rem;
    }

    .stats {
      width: 100%;
      padding: {
        right: 1.5vw;
        left: 1.5vw;
      };

      display: grid;
      grid-template-columns: 1fr 1fr;

      .temperature {
        .current {
          font-size: 2.25rem;
        }

        .diff {
          font-size: 1.5rem;
        }
      }

      .money {
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
    }

    .version {
      text-align: right;
      margin-right: 1.5vw;
    }

    .suicide, .reincarnate {
      text-transform: lowercase;
      margin-right: 1.5vw;
      padding: 0.25rem;
      border-radius: 1rem;
      font-size: 2rem;
      text-align: center;
      text-decoration: none;
      color: white;
      outline: none;
      cursor: pointer;
    }

    .suicide {
      border: 0.25rem solid hsl(0, 100%, 50%);
      background-color: hsl(0, 100%, 50%);
    }

    .reincarnate {
      border: 0.25rem solid hsl(25%, 100%, 50%);
      background-color: hsl(25%, 100%, 50%);
    }
  }
</style>
