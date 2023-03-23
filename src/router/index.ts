/*
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-02 14:51:38
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-23 17:20:26
 * @description:
 * @FilePath: /vue3-oms/src/router/index.ts
 */
/*
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-02 14:51:38
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-13 11:24:08
 * @description:
 * @FilePath: /vue3-oms/src/router/index.ts
 */
import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createWebHistory
} from 'vue-router'
import Login from '../pages/Login/login.vue'
import Home from '../components/layout.vue'
import NotFoundComponent from '../components/404.vue'
import sellPlanOneself from '../pages/orderManagement/sellPlanOneself.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/user/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/',
  //   redirect: to => {
  //     return 'user/login'
  //   },
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'orderManagement/sellPlanAgent',
        name: 'sellPlanAgent',
        component: () => import('../pages/orderManagement/sellPlanOneself.vue'),
      },
      {
        path: 'archiveManagement/ProductFiles',
        name: 'ProductFiles',
        component: () => import('../pages/archiveManagement/ProductFiles/index.vue'),
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: NotFoundComponent,
  },
  // {
  //   path: '/axios',
  //   name: 'Axios',
  //   component: () => import('@/views/axios.vue') // 懒加载组件
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
  // routes: [{ path: '/:pathMatch(.*)', component: NotFoundComponent }],
})

export default router
