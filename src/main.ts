import '@babel/polyfill';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import Worker from 'worker-loader!./logic/main';

const worker = new Worker();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
