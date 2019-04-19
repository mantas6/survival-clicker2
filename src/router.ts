import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Actions from './views/Actions.vue';
import Development from './views/Development.vue';

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'actions' },
  },
  {
    path: '/actions',
    name: 'actions',
    component: Actions,
  },
];

if (process.env.NODE_ENV !== 'production') {
  routes.push({
    path: '/development',
    name: 'development',
    component: Development,
  });
}

export default new Router({ routes });
