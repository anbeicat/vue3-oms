/*
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-02 11:23:52
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-23 14:40:49
 * @description:
 * @FilePath: /vue3-oms/src/main.ts
 */
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import './style.css'
import './theme/index.less';
import App from './App.vue'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';
import { useLocalStorage } from '@vueuse/core'
import router from './router/index'
import store from './store'
import { useDefaultStore } from "./store/defaultSettings"
// 创建vue实例
const app = createApp(App)
const defaultStore = useDefaultStore()
Message._context = app._context;

app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  // componentPrefix: 'arco'
});
app.use(ArcoVueIcon);
// 挂载pinia
app.use(store)
app.use(router)
app.config.globalProperties.axios = 'axios';
router.beforeEach(async (to, from, next) => {

  if (
    // 检查用户是否已登录
    !useLocalStorage('token', null).value &&
    // ❗️ 避免无限重定向
    to.name !== 'login'
  ) {
    localStorage.clear()
    // 将用户重定向到登录页面
    next({ name: 'login' })
  }

  if (to.name === 'Home') {
    // localStorage.clear()
    next({ name: to.matched[0].children[0].name })
  }
  if (to.name === 'login') {
    localStorage.clear()
    next()
  }
  if (to.name !== 'login' && to.name !== '404') {
    if (!router.options.routes.filter((item: any) => {
      return item.name === 'Home'
    })[0].children?.some((subItem: any) => {
      return subItem.name === to.name
    })) {
      next({ name: '404' })
    }
  }
  defaultStore.getState(to)
  let breadcrumb: any = [];
  const buttons = JSON.parse(useLocalStorage('buttons', null).value)
  const findPageButtons = (path: string, children?: string) => {
    const pathList = path.split('/')
    buttons?.map((item: any) => {
      if (pathList.length < 4 && path.indexOf(item.path) > -1) {
        if (children) {
          item.children.map((subItem: any) => {
            if (children.indexOf(subItem.path) > -1) {
              breadcrumb.push({ path: subItem.path, label: subItem.name });
            }
          })
        } else {
          breadcrumb.push({ path: '', label: item.parentName }, { path: item.path, label: item.name });
        }
      } else if (pathList.length > 3) {
        findPageButtons(pathList.slice(0, -1).join('/'), pathList[pathList.length - 1])
      }
    })
    return breadcrumb;
  };
  findPageButtons(to.path)
  defaultStore.getBreadcrumb(breadcrumb)
  next()
})

// 挂载实例
app.mount('#app');

