import Vue from 'vue';
import VueRouter from 'vue-router';

import 'components/Root';
import 'components/toaster/ToastContainer';

import IndexPage from 'views/IndexPage';
import AboutPage from 'views/AboutPage';
import ReadPage from 'views/ReadPage';

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
      path: '/clone/:key',
      component: IndexPage
    },
    {
      path: '/:key',
      component: ReadPage
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
