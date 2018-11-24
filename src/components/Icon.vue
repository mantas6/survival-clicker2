<template>
  <span v-html="content"></span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  async mounted(this: Icon) {
    const response = await fetch(this.url);
    this.content = await response.text();
  },
})
export default class Icon extends Vue {
  content = '';

  @Prop({ required: true })
  name!: string;

  get url() {
    switch (this.name) {
      case 'logo':
        return require('@/assets/logo.svg');
    }
  }
}
</script>
