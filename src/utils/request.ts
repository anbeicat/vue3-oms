import Axios, { AxiosRequestConfig } from 'axios'
import { Base64 } from 'js-base64';
import { Message } from '@arco-design/web-vue';
import { useLocalStorage } from '@vueuse/core'
import { stringify } from 'qs';
import pinia from '../store/index'
import { useDefaultStore } from "../store/defaultSettings"
import router from '../router/index'
const defaultStore = useDefaultStore(pinia)
const baseURL = '/api-sales'
const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}
const axios = Axios.create({
  baseURL,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  // },
  timeout: 20000, // 请求超时 20s
})
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 客户端认证
axios.defaults.headers.Authorization = `Basic ${Base64.encode(
  `${defaultStore.clientId}:${defaultStore.clientSecret}`,
)}`
// axios.defaults.headers.common['Blade-Auth'] = ''


// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */

    // const token = defaultStore.token
    const token = localStorage['token']
    defaultStore.getLoading(true)
    if (token) {
      response.headers['Blade-Auth'] = token
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    const code = response.data.code
    const msg = response?.data.msg
    defaultStore.getLoading(false)
    if (code === undefined) {
      Message.error(msg || '拉取数据失败')
    }
    if (code >= 200 && code < 300) {
      if (response.data.success) {
        return response.data.data;
      } else {
        Message.error(msg || '拉取数据失败')
      }

    }
    if ([7045, 7046, 1000203, 7082, 8025].includes(code)) {
      return response.data.data;
    }
    if (code === 401) {
      if (defaultStore.token) {
        localStorage.clear()
        Message.error(msg)
      }
      setTimeout(() => {
        router.push('/user/login')
      }, 1000);
    } else {
      Message.error(msg || codeMessage[code])
    }
    return response.data.data;
  },
  (error) => {
    defaultStore.getLoading(false)
    if (error.toString().indexOf('timeout') > -1) {
      Message.error('请求超时,请重试！');
    } else {
      const { code, msg } = error.response.data || {};
      if (code === 401) {
        if (defaultStore.token) {
          Message.error('登录已过期，请重新登录')
          localStorage.clear()
        } else {
          Message.error(msg || '请求失败')
        }
        setTimeout(() => {
          router.push('/user/login')
        }, 1000);
      } else {
        Message.error(msg || '请求失败')
      }
    }
    return Promise.reject(error)
  }
)


export default axios
