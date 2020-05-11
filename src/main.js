import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import { WSAPI } from '@/_config/config';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueNativeSock, WSAPI, {
  store,
  format: 'json',
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 600,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
