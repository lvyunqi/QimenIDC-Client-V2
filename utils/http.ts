import { hash } from 'ohash'
import Swal from 'sweetalert2';
 
// 后端返回的数据类型
export interface ResOptions<T> {
  data?: T
  code?: number
  msg?: string
}
 
/**
 * api请求封装
 * @param { String } url 请求地址
 * @param { Object } options useFtech第二个参数
 * @param { Object } headers 自定义header头, 单独设置headers区分请求参数，也好设置类型
 */
const fetch = (url: string, options?: any, headers?: any): Promise<any> => {
 
  const { public: { SERVER_API_HOST } } = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
  const { public: { adminPath } } = useRuntimeConfig()

  // if (url.indexOf('/api') !== 0) {
  //   url = adminPath + url
  // }
  url = adminPath + url

  const reqUrl = SERVER_API_HOST + url // 你的接口地址
  // console.log(NUXT_PUBLIC_API_MOCK)
  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const key = hash(JSON.stringify(options) + url)
 
  // 可以设置默认headers例如
  const customHeaders = { Authorization: useCookie('token').value, ...headers }
 
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { 
      ...options, key, 
      headers: customHeaders,
      // 如果不是get请求，需要将参数转为json字符串
      body: options.method !== 'get' ? JSON.stringify(options.params) : undefined,

     }).then(({ data, error }) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      if (!value) {
        // 这里处理错你自定义的错误，例如code !== 1
        // throw createError({
        //   statusCode: 500,
        //   statusMessage: reqUrl,
        //   message: '自己后端接口的报错信息',
        // })
        const toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            popup: `color-danger`
          },
        });
        toast.fire({
            title: `请检查后端通讯`,
        });
        throw createError({
          statusCode: 500,
          statusMessage: reqUrl,
          message: `请检查后端通讯`,
        })

      } else {
        // api鉴权失败也返回数据
        if (value.code === 501002) {
          const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              popup: `color-danger`
            },
          });
          toast.fire({
              title: `[${value.code}] ${value.message}`,
          });
          
          resolve(value)
        }

        if (value.code !== 20000) {
          const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              popup: `color-danger`
            },
          });
          toast.fire({
              title: `[${value.code}] ${value.message}`,
          });
          throw createError({
            statusCode: value.code,
            statusMessage: reqUrl,
            message: value.message,
          })
        }
        resolve(value)
      }
    }).catch((err: any) => {
      // console.log(err)
      reject(err)
    })
  })
}
 
export default class Http {
 
  get(url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'get', params }, headers)
  }
 
  post (url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'post', params }, headers)
  }
 
  put (url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'put', params }, headers)
  }
 
  delete (url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'delete', params }, headers)
  }
}