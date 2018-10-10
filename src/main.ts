import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import { Relay } from '@/classes/relay';
import Worker from 'worker-loader!./worker/main';
import { enableLogging } from '@/utils/log';

const worker = new Worker();
const relay = new Relay(worker);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

relay.on('stats', stats => {
  store.commit('updateStats', stats);
});

relay.on('actions', processes => {
  store.commit('updateActions', processes);
});

if (localStorage.getItem('debug')) {
  enableLogging();
}
