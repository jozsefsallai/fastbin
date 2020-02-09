import Vue from 'vue';
import VTooltip from 'v-tooltip';

import router from './router';

Vue.use(VTooltip);

const vm = new Vue({
  router
});

vm.$mount('#root');
