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
export default class Incarnation extends Vue {
  @Getter relay!: Relay;

  reset() {
    this.relay.emit('action', { path: 'actions.other.character.reincarnate', multiplier: 1 });
  }
}
</script>

<style lang="scss" scoped>
  button {
    background: transparent;
    color: black;
    border: 1px solid black;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    padding: 0.25rem 1rem;
    cursor: pointer;

    .dark-mode & {
      color: white;
      border-color: white;
    }
  }
</style>
