import Vue from 'vue';
import Router from 'vue-router';
import Actions from './views/Actions.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/actions/:name',
      name: 'actions',
      component: Actions,
    },
  ],
});
