import Http from '@/utils/http'

export default new class status extends Http {

  // 请求状态接口
  getStatus() {
    return this.get('/test')
  }

}