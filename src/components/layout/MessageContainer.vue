<template>
  <div>
    <div v-if="isUpdateAvailable" class="update">Update is available. <a href="#" @click.prevent="reload">Reload to update</a></div>
    <div v-else-if="isStaging" class="staging">You are currently running a staging build. Long term stablility of your savegame is not guaranteed. <a :href="stableBuildUrl">Switch to a stable build</a></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Decimal from 'decimal.js';
import { isUpdateAvailable } from '@/utils/version';

@Component({
  async created(this: MessageContainer) {
    this.isUpdateAvailable = await isUpdateAvailable();
    this.checkInterval = setInterval(async () => {
      this.isUpdateAvailable = await isUpdateAvailable();
    }, 60e3);
  },

  destroyed(this: MessageContainer) {
    clearInterval(this.checkInterval);
  },
})
export default class MessageContainer extends Vue {
  isUpdateAvailable: boolean = false;
  checkInterval?: number = undefined;

  get isStaging() {
    return process.env.VUE_APP_STAGING_WARNING;
  }

  get stableBuildUrl() {
    return process.env.VUE_APP_STABLE_URL;
  }

  reload() {
    location.reload();
  }
}
</script>

<style lang="scss" scoped>
  .staging {
    @include top-message(#c72424, white);
  }

  .update {
    @include top-message(#ffea31, black);
  }
</style>
