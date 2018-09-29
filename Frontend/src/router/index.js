import Router from 'vue-router'

Vue.use(Router)

const vueRouter = new Router({
  // base: '/lccp/',
  // mode: 'history',
  routes: [
    {
      path: '/task',
      name: 'TaskList',
      component: resolve => require(['@/components/Views/Task/TaskList'], resolve),
      meta: {
        title: '优行'
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
