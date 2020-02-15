import Vue from 'vue';
import VTooltip from 'v-tooltip';
import VueHotkeys from 'vue2-hotkeys';

import router from './router';

Vue.use(VTooltip);
Vue.use(VueHotkeys);

const vm = new Vue({
  router
});

vm.$mount('#root');
