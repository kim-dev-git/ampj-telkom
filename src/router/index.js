import Vue from 'vue'
import VueRouter from 'vue-router'

import { fb } from '@/./firebase'

import Home from '../views/Home.vue'

import Login from '@/views/User/Login.vue'

import Dashboard from '@/views/Dashboard.vue'
import Requests from '@/views/Requests.vue'
import Request from '@/views/Request.vue'
import Tools from '@/views/Tools'
import Tool from '@/views/Tool'
import Teams from '@/views/Teams'
import Team from '@/views/Team'
import Absent from '@/views/Absent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/masuk',
    name: 'Login',
    //component: Login
    component: () => import(/* webpackChunkName: "Login" */ '../views/User/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: "profil",
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue')
      },
      {
        path: "dasbor",
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue')
      },
      {
        path: "permintaan",
        name: 'Requests',
        component: () => import(/* webpackChunkName: "Requests" */ '../views/Requests.vue')
      },
      {
        path: "permintaan/:id",
        name: 'Request',
        component: () => import(/* webpackChunkName: "Request" */ '../views/Request.vue'),
        props: true
      },
      {
        path: "perangkat",
        name: 'Tools',
        component: () => import(/* webpackChunkName: "Tools" */ '../views/Tools.vue'),
      },
      {
        path: "perangkat/:id",
        name: 'Tool',
        component: () => import(/* webpackChunkName: "Tool" */ '../views/Tool.vue'),
        props: true
      },
      {
        path: "tim",
        name: 'Teams',
        component: () => import(/* webpackChunkName: "Teams" */ '../views/Teams.vue'),
      },
      {
        path: "tim/:id",
        name: 'Team',
        component: () => import(/* webpackChunkName: "Team" */ '../views/Team.vue'),
        props: true
      },
      {
        path: "absen",
        name: 'Absent',
        component: () => import(/* webpackChunkName: "Absent" */ '../views/Absent.vue'),
      },
      {
        path: "pasangbaru",
        name: 'CustomerNew',
        component: () => import(/* webpackChunkName: "CustomerNew" */ '../views/Customer/New.vue'),
      },
      {
        path: "pasangbaru/:id",
        name: 'Customer',
        component: () => import(/* webpackChunkName: "Team" */ '../views/Customer/Customer.vue'),
        props: true
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser
  
  if (requiresAuth && !currentUser) {
    next('/masuk')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
