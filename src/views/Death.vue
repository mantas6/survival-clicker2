<template>
  <div>
    <button @click="reset">{{ $t('reincarnate') }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Relay } from '@/classes/relay';

@Component
export default class Death extends Vue {
  @Getter relay!: Relay;

  reset() {
    this.relay.emit('action', { path: 'actions.other.character.reincarnate', multiplier: 1 });
  }
}
</script>
