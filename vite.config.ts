/*
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-02 11:23:52
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-23 14:17:38
 * @description:
 * @FilePath: /vue3-oms/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 8080, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    host: '0.0.0.0',
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api-sales': {
        target: 'http://10.10.80.98:30518/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api-sales', '/')
      },
      // '/api-sales': {
      //   target: 'http://test-os.hossp.com/',
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace('/api-sales', '/api-sales')
      // },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/theme/index.less')}";`,
          // 'arcoblue-6': '#f85959',
        },
        // math: 'strict',
        javascriptEnabled: true,
      },
    },
  },
  // 生产环境打包配置
  build:{
    terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
    }
  }
})
