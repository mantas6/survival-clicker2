import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import { Relay } from '@/classes/relay';
import Worker from 'worker-loader!./worker/main';
import { log, enableLogging } from '@/utils/log';
import NumberFormat from '@/components/NumberFormat.vue';
import LocalForage from 'localforage';
import { i18n } from './i18n';
import VTooltip from 'v-tooltip';

import { collect, send } from '@/utils/collect';
import { timer } from 'rxjs';

const storage = LocalForage.createInstance({
  name: 'store',
  driver: LocalForage.LOCALSTORAGE,
});

const worker = new Worker();
const relay = new Relay(worker);

store.commit('setRelay', relay);

Vue.component('NumberFormat', NumberFormat);
Vue.use(VTooltip);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

relay.on('state', ({ stats, actions, modifiers, timers, globals, processes }) => {
  store.commit('updateStats', stats);
  store.commit('updateActions', actions);
  store.commit('updateModifiers', modifiers);
  store.commit('updateTimers', timers);
  store.commit('updateGlobals', globals);
  store.commit('updateProcesses', processes);
});

storage.getItem('debug').then(isEnabled => {
  if (isEnabled) {
    enableLogging();
    relay.emit('enableLogging');
  }
});

relay.on('save', serializedState => {
  storage.setItem('save', serializedState);
  log('Saving game state', serializedState);
});

storage.getItem('save').then(previousSave => {
  if (previousSave) {
    relay.emit('load', previousSave);
  }
});

timer(0, 10e3).subscribe(() => {
  collect();
});

send([]);
