import Vue from 'vue';
import VueRouter from 'vue-router';
import List from '../views/List.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'list',
    component: List,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
