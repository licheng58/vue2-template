import axios from 'axios'
import { Message } from 'element-ui'
import { isCheckTimeout } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 项目需要
    // console.log(store)
    config.headers.icode = `256C7B088E4531A6`
    if (store.getters.token) {
      // console.log(isCheckTimeout())
      // 判断token时效性
      if (isCheckTimeout()) {
        // 退出登陆
        store.dispatch('user/logout')
        return Promise.reject(new Error('Token 失效 !'))
      }

      config.headers.Authorization = `Bearer ${store.getters.token}`
      config.headers['Accept-Language'] = store.getters.language
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      Message.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // TODO: 将来处理 token 超时问题
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
