import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../services/core/config'

Vue.use(VueRouter)

const PUBLIC_PATHS = ['/login']

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new VueRouter({
  routes,
})

const unAuthenticatedAndPrivatePage = (path) => (!PUBLIC_PATHS.includes(path)
    && !(ACCESS_TOKEN in window.localStorage)
    && !(REFRESH_TOKEN in window.localStorage))

router.beforeEach((to, from, next) => {
  if (unAuthenticatedAndPrivatePage(to.path)) {
    return next({path: `/login?next=${to.path}`})
  } else {
    return next()
  }
})


export default router