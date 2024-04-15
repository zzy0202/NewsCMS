import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import HomePageView from "@/views/HomePageView.vue";
import UserCenterView from "@/views/UserCenterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect:"/home",
      children:[
        {
          path:'/home',
          name:'homePage',
          component:HomePageView,
        },
        {
          path:'/userCenter',
          name:'userCenter',
          component:UserCenterView,
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:LoginView
    },
  ]
})

export default router
