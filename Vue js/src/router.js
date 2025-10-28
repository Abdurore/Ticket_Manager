import { createRouter, createWebHistory } from 'vue-router'
import Landing from './components/Landing.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Dashboard from './components/Dashboard.vue'
import Tickets from './components/Tickets.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Landing },
    { path: '/auth/login', component: Login },
    { path: '/auth/signup', component: Signup },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/tickets', component: Tickets, meta: { requiresAuth: true } },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ticketapp_session')
  if (to.meta.requiresAuth && !token) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router