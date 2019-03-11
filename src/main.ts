import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import { Relay } from '@/classes/relay';
import Worker from 'worker-loader!./worker/main';
import { log, enableLogging } from '@/utils/log';
import { collect } from '@/utils/collect';
import NumberFormat from '@/components/NumberFormat.vue';
import LocalForage from 'localforage';
import { i18n } from './i18n';
import * as Sentry from '@sentry/browser';

const storage = LocalForage.createInstance({
  name: 'store',
  driver: LocalForage.LOCALSTORAGE,
});

const worker = new Worker();
const relay = new Relay(worker);

store.commit('setRelay', relay);

Vue.component('NumberFormat', NumberFormat);

if (!process.env.VUE_APP_DISABLE_SENTRY) {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_KEY,
    integrations: [new Sentry.Integrations.Vue({ Vue })],
    environment: process.env.NODE_ENV,
  });
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

relay.on('state', ({ stats, actions, modifiers, timers, globals, processes, measures }) => {
  store.commit('updateStats', stats);
  store.commit('updateActions', actions);
  store.commit('updateModifiers', modifiers);
  store.commit('updateTimers', timers);
  store.commit('updateGlobals', globals);
  store.commit('updateProcesses', processes);
  store.commit('updateMeasures', measures);
  store.commit('setLoaded');
});

storage.getItem('debug').then(isEnabled => {
  if (isEnabled) {
    enableLogging();
    relay.emit('enableLogging');
  }
});

storage.getItem('darkMode').then(isEnabled => {
  if (isEnabled) {
    store.commit('setDarkMode', true);
  }
});

store.watch(state => state.Settings.darkMode, value => {
  storage.setItem('darkMode', value);
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

if (!process.env.VUE_APP_DISABLE_SENTRY) {
  worker.addEventListener('error', error => {
    const { message, lineno, filename } = error;
    Sentry.captureException(new Error(`${message} at line ${lineno} in ${filename}`));
  });
}

relay.watch((name, data) => {
  const time = new Date().getTime().toString();
  const version = process.env.VUE_APP_VERSION;

  collect({
    name: 'relay',
    titles: { name, version },
    attachments: { data: JSON.stringify(data) },
    values: {
      time: { value: time, e: '1' },
    },
  });
});
