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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  strict: process.env.NODE_ENV !== 'production',
  modules: { Stats, Actions, Modifiers, Relay, Timers, Settings, Globals, Processes },
});
