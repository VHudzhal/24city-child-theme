import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
// import News from "./pages/News";
//Vue.component('News', News);
window.axios = require('axios');

Vue.use(VueRouter)
import router from "./router";
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
