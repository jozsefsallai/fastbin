import Vue from 'vue';
import VueRouter from 'vue-router';

import 'components/Root';

import IndexPage from 'views/IndexPage';
import AboutPage from 'views/AboutPage';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/about',
      component: AboutPage
    },
    {
      path: '*',
      component: null,
      beforeEnter: function (to, from, next) {
        return next('/');
      }
    }
  ]
});
