import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import { Relay } from '@/classes/relay';
import Worker from 'worker-loader!./worker/main';
import { log, enableLogging } from '@/utils/log';
import NumberFormat from '@/components/NumberFormat.vue';

const worker = new Worker();
const relay = new Relay(worker);

store.commit('setRelay', relay);

Vue.component('NumberFormat', NumberFormat);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

relay.on('state', ({ stats, actions, modifiers, timers }) => {
  store.commit('updateStats', stats);
  store.commit('updateActions', actions);
  store.commit('updateModifiers', modifiers);
  store.commit('updateTimers', timers);
});

if (localStorage.getItem('debug')) {
  enableLogging();
  relay.emit('enableLogging');
}

relay.on('save', serializedState => {
  localStorage.setItem('save', JSON.stringify(serializedState));
  log('Saving game state', serializedState);
});

const previousSave = localStorage.getItem('save');

if (previousSave) {
  relay.emit('load', JSON.parse(previousSave));
}

log('Application was built on', process.env.BUILD_TIME);
