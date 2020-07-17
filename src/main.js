import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/element";
// 引入全局样式表
// import './assets/css/global.css'
// 导入字体图标
import "./assets/fonts/iconfont.css";
// 配置axios
import axios from "axios";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
