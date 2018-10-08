// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import httpClient from './store/common/httpClient'
import router from './router'
// 图标字体
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/angle-up'
import 'vue-awesome/icons/angle-down'
import 'vue-awesome/icons/star'
import 'vue-awesome/icons/star-o'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/toggle-on'
import 'vue-awesome/icons/toggle-off'
import 'vue-awesome/icons/question-circle-o'
import 'vue-awesome/icons/angle-right'
import 'vue-awesome/icons/clock-o'
import 'vue-awesome/icons/sort-asc'
import 'vue-awesome/icons/sort-desc'
import 'vue-awesome/icons/thumbs-o-up'
import 'vue-awesome/icons/commenting-o'
import 'vue-awesome/icons/refresh'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false
Vue.component('icon', Icon)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
