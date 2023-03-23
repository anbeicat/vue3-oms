/*
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-07 09:54:35
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-20 11:25:33
 * @description:
 * @FilePath: /vue3-oms/src/store/defaultSettings.ts
 */
import { defineStore } from 'pinia'
import { useLocalStorage, useSessionStorage } from '@vueuse/core'
import { AnyAaaaRecord } from 'dns'
export const useDefaultStore = defineStore('main', {
  state: () => ({
    clientId: 'omsSeller', // 客户端id
    clientSecret: 'seller_secret', // 客户端密钥
    navTheme: 'light',
    siderWidth: 180,
    headerHeight: 80,
    primaryColor: '#369EF8',
    layout: 'mix',
    headerTheme: 'light',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    collapsedButtonRender: false,
    colorWeak: false,
    splitMenus: true,
    breakpoint: 'xxl',
    title: '',
    pwa: false,
    logo: '/logo.png',
    locale: false,
    iconfontUrl: '//at.alicdn.com/t/font_2586108_0oecr57l5x2h.js',
    huaweiyunUrl: 'https://yzylprod.obs.cn-southwest-2.myhuaweicloud.com/oms-pic/',
    token: null,
    routes: [],
    buttons: [],
    loading: false,
    state: {},
    breadcrumb:[],
    theme:true
  }),
  actions: {
    getToken(token: any) {
      this.token = token
    },
    getRoutes(routes: any) {
      this.routes = routes
    },
    getButtons(buttons: any) {
      this.buttons = buttons
    },
    getLoading(loading: any) {
      this.loading = loading
    },
    getState(to:any) {
      this.state = to
    },
    getBreadcrumb(breadcrumb:any) {
      this.breadcrumb = breadcrumb
    },
    getTheme(theme:any) {
      this.theme = theme
    },
  },

})
