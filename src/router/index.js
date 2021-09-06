import Vue from 'vue';
import VueRouter from 'vue-router';
import Work from '../views/work.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'work',
    component: Work,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
