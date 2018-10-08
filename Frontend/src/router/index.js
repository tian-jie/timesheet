import Router from 'vue-router'

Vue.use(Router)

const vueRouter = new Router({
  // base: '/lccp/',
  // mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'Timesheet',
      component: resolve => require(['@/components/Views/Timesheet/Timesheet'], resolve),
      meta: {
        title: 'timesheet'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

vueRouter.beforeEach((to, from, next) => {
  next()
})

export default vueRouter
