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

relay.on('state', ({ stats, actions, modifiers }) => {
  store.commit('updateStats', stats);
  store.commit('updateActions', actions);
  store.commit('updateModifiers', modifiers);
});

if (localStorage.getItem('debug')) {
  enableLogging();
  relay.emit('enableLogging');
}

log('Application was built on', process.env.BUILD_TIME);
