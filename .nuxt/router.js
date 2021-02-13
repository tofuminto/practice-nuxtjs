import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8e1045e2 = () => interopDefault(import('../pages/more-fun/index.vue' /* webpackChunkName: "pages/more-fun/index" */))
const _35afd7c6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _f0e4c976 = () => interopDefault(import('../pages/_fun.vue' /* webpackChunkName: "pages/_fun" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/more-fun",
    component: _8e1045e2,
    name: "more-fun"
  }, {
    path: "/",
    component: _35afd7c6,
    name: "index"
  }, {
    path: "/:fun",
    component: _f0e4c976,
    name: "fun"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
