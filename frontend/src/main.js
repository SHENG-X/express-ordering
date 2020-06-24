import Vue from 'vue';
import Antd from 'ant-design-vue';

import App from './App.vue';
import router from './router';
import store from './store';

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

// import all ant design components for now
// TODO: investigate if all compnoents are needed
Vue.use(Antd);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
