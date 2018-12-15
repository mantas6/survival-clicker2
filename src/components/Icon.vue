<template>
  <span v-html="content"></span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

interface IconDictionary {
  [iconName: string]: string;
}

@Component({
  mounted(this: Icon) {
    this.updateContent();
  },
})
export default class Icon extends Vue {
  content = '';

  @Prop({ required: true })
  name!: string;

  get url() {
    const icons: IconDictionary = {
      logo: require('@/assets/logo.svg'),
    };

    return icons[this.name];
  }

  @Watch('url')
  onUrlChange() {
    this.updateContent();
  }

  async updateContent() {
    const response = await fetch(this.url);
    this.content = await response.text();
  }
}
</script>
