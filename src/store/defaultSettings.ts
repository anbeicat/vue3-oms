/*
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-07 09:54:35
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-24 13:25:04
 * @description:
 * @FilePath: /vue3-oms/src/store/defaultSettings.ts
 */
import { defineStore } from 'pinia'
import { useLocalStorage, useSessionStorage } from '@vueuse/core'
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
    token: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiJTXzAwMDA4NyIsInRoaXJkX2NvZGUiOiIxMDUiLCJ0ZW5hbnRfbmFtZSI6IuWbm-W3neecgeS6muS4reWGt-mTvuWMu-iNr-eJqea1geaciemZkOi0o-S7u-WFrOWPuCIsInRlbmFudF9wcmltYXJ5X2tleV9pZCI6IjE2MDI4NjYxNTgyNzg0MTQzMzciLCJ1c2VyX25hbWUiOiJ5emxsIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInBsYXRmb3JtIjoiMiIsInJvbGVfbmFtZSI6IiIsInVzZXJfdHlwZSI6IjIxMzI4NjkxMjEiLCJ1c2VyX2lkIjoiMTYwMjg2NjE1NzM4MTIzODc4NiIsInJvbGVfaWQiOiIxNTQxMjYyOTEwNTIxNjcxNjgxIiwicGhvbmUiOiIxODM4MjAzMzIyMiIsImdyb3VwX2lkIjoiR18wMDAwMDEiLCJhY2NvdW50IjoieXpsbCIsInBhYXNfdGVuYW50X2lkIjoiMDAwMDg3IiwiY2xpZW50X2lkIjoib21zU2VsbGVyIiwiZXhwIjoxNjc5NjQ5OTAwfQ.KRcDfwW0cTLY2jxePCowQF7sYrjWV487FztQR2Emiv93rLz91rXSJ-FpDyDe_61GkcfSZYHpdREU_cI_M2YL1w',
    routes: [],
    buttons: [],
    loading: false,
    state: null,
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
