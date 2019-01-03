<template>
  <article>
    <section v-for="(group, groupName) of availableGroups" v-if="Object.keys(group).length" :key="groupName">
      <small>{{ $t(`actions.${category}.groups.${groupName}.title`) }}</small>
      <div v-for="(action, actionName) of group"
          :key="actionName"
          @mouseenter="markAsSeen(action.fullPath)"
          v-tooltip.right="$t(`actions.${category}.groups.${groupName}.items.${actionName}.info`)"
          class="item"
          :class="!action.isAvailable ? 'unavailable' : ''">
          <div class="head" @click="activate(action.fullPath, 1)">
            <div>
              <span class="name">{{ $t(`actions.${category}.groups.${groupName}.items.${actionName}.title`) }}</span>
              <span class="unseen" v-show="!action.isSeen">*</span>
            </div>
            <number-format class="cost" v-if="action.money" :value="action.money.diff" post-fix="$"></number-format>
          </div>
          <div class="options">
            <span @click="activate(action.fullPath, action.maxMultiplier)">MAX</span>
          </div>
        </div>
    </section>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';
import { Relay } from '@/classes/relay';

@Component({
  updated(this: Actions) {
    if (this.availableCategories && !this.availableCategories.includes(this.category)) {
      this.$router.push({ name: 'home' });
    }
  },
})
export default class Actions extends Vue {
  @Getter allActions!: SerializedActions;
  @Getter relay!: Relay;
  @Getter availableCategories!: string[];

  get category() {
    return this.$route.params.name as 'jobs' | 'consumables' | 'drugs' | 'investment';
  }

  get availableGroups() {
    if (!this.allActions) {
      return;
    }

    return this.allActions[this.category];
  }

  activate(path: string, multiplier: string) {
    this.relay.emit('action', { path, multiplier });
  }

  markAsSeen(path: string) {
    this.relay.emit('seen', { path });
  }
}
</script>

<style lang="scss" scoped>
  article {
    display: grid;
    grid-gap: 1rem;

    small {
      color: grey;
    }

    .item {
      user-select: none;
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      padding-left: 0;
      width: 50%;

      .head {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        flex: 1;
      }

      .options {
        margin-left: 0.5rem;
        cursor: pointer;
      }

      .name {
        flex: 1;
      }

      .unseen {
        color: red;
      }

      &.unavailable {
        color: grey;
      }
    }
  }
</style>
