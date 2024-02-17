import { defineStore } from 'pinia'

export const useMyTokenStore = defineStore({
  id: 'myTokenStore',
  state: () => ({ 
    token: ''
   }),
  actions: {
    // 设置和修改token
    setToken(token: any = ''){
      this.token = token;
      // 将token储存到cookie中
      const cookie = useCookie('token');
      cookie.value = token;
    },

    // 读取cookie中的token
    getToken(){
      const cookie = useCookie('token');
      this.token = cookie.value || '';
    },

    // 退出登录
    logout(){
      this.token = '';
      // 删除cookie中的token
      const cookie = useCookie('token');
      cookie.value = undefined || null;
    },
  }
})
