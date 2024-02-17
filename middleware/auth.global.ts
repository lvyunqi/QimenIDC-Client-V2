import { useMyTokenStore } from '@/stores/token'


// 鉴权
export default defineNuxtRouteMiddleware((to, from) => {
    const cookie = useMyTokenStore();
    const { statusApi } = useApi()
    
    // 获取token
    cookie.getToken();
    const token = cookie.token;
    // 判空
    if(!token){
        // 转向登录页
        if(to.path !== '/auth/login'){
            return navigateTo('/auth/login')
        }
    }else{
        statusApi.getStatus().then((res) =>{
            if(res.code !== 20000){
                // token失效
                cookie.logout();
                navigateTo('/auth/login')
            }
        })

    }
})


