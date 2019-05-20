import Vue from 'vue';
import Router from 'vue-router';
import Auth from './views/auth.vue';
import Admin from './views/admin';
import Department from './views/department';
import Employee from './views/employee';

Vue.use(Router)
const user = localStorage.getItem('userData');

export default new Router({
  mode: 'history',
  routes: [{

      path: '/',
      name: 'auth',
      component: Auth
    },
    {
      path: '/admin/:_id',
      name: 'admin',
      meta: {
        requiresAuth: true
      },
      props: {
        user
      },
      component: Admin
    },
    {
      path: '/department/:_id',
      name: 'department',
      meta: {
        requiresAuth: true,
        user
      },
      component: Department
    },
    {
      path: '/employee/:_id',
      name: 'employee',
      meta: {
        requiresAuth: true,
        user
      },
      component: Employee
    }
  ],
  beforeEach: (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

      if (!user) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    } else {
      next()
    }

  }
})
