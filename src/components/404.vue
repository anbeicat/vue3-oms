<!--
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-13 15:59:28
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-23 15:29:21
 * @description:
 * @FilePath: /vue3-oms/src/components/404.vue
-->
<script setup lang="ts">
import { ref } from 'vue'
import router from '../router/index'
</script>

<template>
  <a-result status="404" subtitle="Whoops, that page is gone.">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="()=>{
          router.back()
        }">Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>


<style scoped></style>
