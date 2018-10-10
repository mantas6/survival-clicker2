<template>
  <article>
    
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['processes', 'stats']),
  },
})
export default class Actions extends Vue {
  
}
</script>
