import Http from '@/utils/http'

export default new class login extends Http {

  // 登录
  loginDo(params?: any) {
    return this.post('/loginDo', params)
  }

}