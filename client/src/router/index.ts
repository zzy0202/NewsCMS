import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import HomePageView from "@/views/HomePageView.vue";
import UserCenterView from "@/views/UserCenterView.vue";
import ManageEditorView from "@/views/ManageEditorView.vue";
import ModfiyEditorView from "@/views/ModfiyEditorView.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import {useUserStore} from "@/stores";
import CreateNewsView from "@/views/createNewsView.vue";
import ManageNewsList from "@/views/ManageNewsList.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: "/home",
      children: [
        {
          path: '/home',
          name: 'homePage',
          component: HomePageView,
        },
        {
          path: '/userCenter',
          name: 'userCenter',
          component: UserCenterView,
        },
        {
          path: '/manageEditor',
          name: 'manageEditor',
          component: ManageEditorView,
          meta: {
            requiresAdmin: true,
          }
        },
        {
          path: '/modifyEditor',
          name: 'modifyEditor',
          component: ModfiyEditorView,
          meta: {
            requiresAdmin: true,
          }
        },
        {
          path: '/createNews',
          name: 'createNews',
          component: CreateNewsView,
        },
        {
          path: '/manageNewsList',
          name: 'manageNewsList',
          component: ManageNewsList,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/404',
      name: "pageNotFound",
      component: PageNotFound
    },
    {
      path: '/:pathMatch(.*)',
      redirect: {
        path: "/404",
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let {userInfo} = useUserStore();
  if (to.meta.requiresAdmin) {
    if (userInfo.isAdmin) {
      next();
    } else {
      next({
        path: "/404",
      })
    }
  }
  next();
})

export default router
