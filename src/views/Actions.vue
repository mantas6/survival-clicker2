<template>
  <article>
    
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';

export default class Actions extends Vue {
  @Getter public actions!: SerializedActions;
}
</script>
