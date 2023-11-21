import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from "firebase/auth";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
   
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue')
    },
    {
      path: '/attendance',
      name: 'attendance',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Attendance.vue'),
      meta:{
        requiresAuth:true
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
 if (to.matched.some((record) => record.meta.requiresAuth)) {
  if(getAuth().currentUser){
    next()
  }else{
    alert('you dont have access!');
    next({ name: 'home' })
  }
 }else{
  next()
 }

})
export default router
