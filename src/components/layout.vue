<!--
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-03 14:02:44
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-23 17:01:14
 * @description:
 * @FilePath: /vue3-oms/src/components/layout.vue
-->
<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeMount, nextTick, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { dynamicRoutes, dynamicButtons } from '../services/user';
import { useDefaultStore } from "../store/defaultSettings"
import router from '../router/index'

const defaultStore = useDefaultStore()
let routes = reactive([])
let buttons = reactive([])
const collapsed = ref(false)
const selectedKeys = ref()
const openKeys = ref()
onBeforeMount(() => {
  routes = JSON.parse(localStorage['routes'])
  buttons = JSON.parse(localStorage['buttons'])
  selectedKeys.value = [defaultStore.state?.path]
})
const onCollapse = (val: boolean) => {
  collapsed.value = val;
}

const onClickMenuItem = (key: string) => {
  selectedKeys.value = [key]
  router.push(key)
}
const themeChane = (e: any) => {
  defaultStore.getTheme(e)
  console.log('eee', e);
  if (e) {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme');
  } else {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', 'dark')
  }

}
</script>

<template>
  <a-layout class="layout">
    <a-layout-header :class="defaultStore.theme ? 'layout-header' : 'layout-header dark-layout-header'">
      <div>
        <a href="">
          <img src="../assets/logo.png" alt="">
        </a>
      </div>
      <div>
        <span>yzll</span>
        <a-divider direction="vertical" />
        <span>四川省亚中冷链医药物流有限责任公司</span>
        <img src="../assets/avatar.png" alt="" class="avatar">
        <a-space>
          <a-tooltip :content="defaultStore.theme ? '亮色模式' : '暗黑模式'">
            <a-switch checked-color="#ccc" unchecked-color="#ccc" v-model:model-value="defaultStore.theme"
              @change="themeChane">
              <template #checked-icon>
                <icon-sun-fill />
              </template>
              <template #unchecked-icon>
                <icon-moon-fill />
              </template>
            </a-switch>
          </a-tooltip>
          <span style="color: #f2d27d;">切换卖家</span>
        </a-space>
      </div>
    </a-layout-header>
    <a-layout has-sider class="layout-sider">
      <a-layout-sider :width="180" collapsible v-model:collapsed="collapsed" @collapse="onCollapse">
        <a-menu accordion v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys"
          :default-open-keys="[routes[0].path]" :default-selected-keys="[routes[0].children[0].path]"
          v-for="(item, index) in routes" :key="index" @menu-item-click="onClickMenuItem">
          <a-sub-menu :key='item.path'>
            <template #icon>
              <icon-home v-if="index === 0" />
              <icon-bookmark v-if="index === 1" />
              <icon-common v-if="index === 2" />
              <icon-relation v-if="index === 3" />
              <icon-apps v-if="index === 4" />
            </template>
            <template #title>{{ item.name }}</template>
            <a-menu-item v-for="(subItem, index) in item.children" :key="subItem.path">
              {{ subItem.name }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <a-space direction="vertical" style="margin-bottom: 30px;">
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in defaultStore.breadcrumb">
              <span v-if="index < 2">{{ item?.label
              }}</span>
              <a-link :href="item.path" v-else>
                {{ item.label }}
              </a-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-space>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <!-- <a-layout-footer>Footer</a-layout-footer> -->
  </a-layout>
</template>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;

  .layout-header {
    background-color: rgb(var(--arcoblue-6));
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 46px !important;
    padding-right: 30px;
    color: #fff;
    font-weight: 700;

    div {
      display: flex;
      align-items: center;

      .avatar {
        width: 46px;
        height: 46px;
        margin-right: 20px;
        margin-left: 28px;
      }
    }
  }

  .dark-layout-header {
    background-color: var(--color-bg-4);
  }

  .layout-sider {
    width: 100%;
    height: 500px;
  }

  .layout-content {
    margin: 16px 16px 0 16px;
    background-color: var(--color-bg-3);
    padding: 16px 20px;
  }
}
</style>

