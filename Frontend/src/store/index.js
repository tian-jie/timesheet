import Vue from 'vue'
import Vuex from 'vuex'
import timesheet from './modules/timesheet'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timesheet
  }
  // plugins: [createLogger()]
})
