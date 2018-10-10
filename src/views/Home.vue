<template>
  <div class="home">
    <span>Build date: {{ buildDate }}</span>
    <div>Eye strain level: {{ count }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { timer, Subscription } from 'rxjs';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['processes', 'stats']),
  },
})
export default class Home extends Vue {
  public count: number = 9000;
  public countSub?: Subscription;

  get buildDate() {
    return process.env.BUILD_TIME;
  }

  public mounted() {
    this.countSub = timer(100, 100).subscribe(_ => {
      this.count++;
    });
  }

  public destroyed() {
    if (this.countSub) {
      this.countSub.unsubscribe();
    }
  }
}
</script>
