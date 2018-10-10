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

@Component({
  components: { GameLogo },
  computed: { ...mapGetters(['stats']) },
})
export default class HeaderContainer extends Vue {
  private stats!: SerializedStats;

  get money() {
    if (this.stats.finance) {
      return this.stats.finance.money.current;
    }

    return 0;
  }
}
</script>

