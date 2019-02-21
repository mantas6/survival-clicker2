<template>
  <div>
    <mundane v-if="isAlive"></mundane>
    <incarnation v-else></incarnation>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedGlobals } from '@/store/globals';
import Mundane from '@/components/subviews/Mundane.vue';
import Incarnation from '@/components/subviews/Incarnation.vue';

@Component({
  components: { Mundane, Incarnation },
})
export default class Actions extends Vue {
  @Getter globals!: SerializedGlobals;

  get isAlive() {
    return this.globals.alive && this.globals.alive.value;
  }
}
</script>
