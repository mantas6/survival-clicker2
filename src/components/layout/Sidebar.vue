<template>
  <aside>
    <timer v-for="(timer, index) in timers" :key="index" :data="timer"></timer>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Timer as SerializedTimer } from '@/classes/game/base/modifiers/timer';
import Timer from '@/components/Timer.vue';

@Component({ components: { Timer } })
export default class Sidebar extends Vue {
  @Getter timers!: { [ index: string ]: SerializedTimer };
}
</script>
