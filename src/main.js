import Vue from 'vue'
import 'lib-flexible'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/fonts/iconfont.css'
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/css/common.css'
import store from './store'
import VueLazyload from "vue-lazyload";

Vue.use(vueSwiper)

Vue.use(VueLazyload, {
  loading: require('./assets/image/load.gif'),
  error: require('./assets/image/yidu.jpg')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
