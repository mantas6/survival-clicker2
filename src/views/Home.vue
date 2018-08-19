<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <span>Build date: {{ buildDate }}</span>
    <div>Brains cells died while thinking about this project: {{ count }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { timer, Subscription } from 'rxjs';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  count: number = 0;
  countSub?: Subscription;

  get buildDate() {
    return process.env.BUILD_TIME;
  }

  mounted() {
    this.countSub = timer(100, 100).subscribe(_ => {
      this.count++;
    });
  }

  destroyed() {
    if (this.countSub) {
      this.countSub.unsubscribe();
    }
  }
}
</script>
