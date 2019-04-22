import Vue from 'vue';
import Vuex from 'vuex';

import { Stats } from './stats';
import { Actions } from './actions';
import { Modifiers } from './modifiers';
import { Relay } from './relay';
import { Timers } from './timers';
import { Settings } from './settings';
import { Globals } from './globals';
import { Processes } from './processes';
import { Measures } from './measures';
import { Wheel } from './wheel';
import { get, startCase } from '@/utils/method';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    Stats,
    Actions,
    Modifiers,
    Relay,
    Timers,
    Settings,
    Globals,
    Processes,
    Measures,
    Wheel,
  },
  mutations: {
    updateState(state, { path, serialized }) {
      const split = path.split('.') as string[];
      split[0] = startCase(split[0]) + '.list';

      const name = split.pop()!;
      const preparedPath = split.join('.');

      const stateNode = get(state, preparedPath);

      if (stateNode) {
        Vue.set(stateNode, name, serialized);
      }
    },
  },
});
