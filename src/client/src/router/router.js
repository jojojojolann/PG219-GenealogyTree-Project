import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginRegisterView from '../views/LoginRegisterView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/login-register',
    name: 'LoginRegister',
    component: LoginRegisterView,
    meta: { requiresGuest: true, layout: 'blank' }
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboardView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next('/login-register');
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !store.getters.isAdmin) {
      next('/home');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isAuthenticated) {
      next('/home');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
