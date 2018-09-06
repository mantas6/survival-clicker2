import '@babel/polyfill';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import { Relay } from '@/classes/relay';
import Worker from 'worker-loader!./logic/main';

const worker = new Worker();
const relay = new Relay(worker);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
