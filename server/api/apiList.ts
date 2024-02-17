import Http from '@/utils/http'
import Swal from 'sweetalert2';

export default new class ApiList extends Http {

  /**
   * 获取API列表
   * @param page 页码
   * @param size 每页数量
   * @returns API列表
   * @throws {Error} 请求失败
  **/
  async getApiList(page: number, size: number) {
    try {
      const response = await this.get('/selectApiByPage', { page, size });
      return response;
    } catch (error) {
      console.error('Error fetching API list:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch API list!',
      });
      throw error; // 重新抛出错误，以便其他地方处理
    }
  }

  /**
   * 删除API
   * @param id API ID
   * @returns 删除结果
   * @throws {Error} 请求失败
  **/
  async deleteApi(id: number) {
    try {
      const response = await this.delete('/deleteApi', { id });
      return response;
    } catch (error) {
      console.error('Error deleting API:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete API!',
      });
      throw error;
    }
  }

  /**
   * 暂停API
   * @param id API ID
   * @returns 暂停结果
   * @throws {Error} 请求失败
  **/
  async pauseApi(id: number) {
    try {
      const response = await this.put('/disableApi/' + id);
      return response;
    } catch (error) {
      console.error('Error pausing API:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to pause API!',
      });
      throw error;
    }
  }

  /**
   * 启用API
   * @param id API ID
   * @returns 启用结果
   * @throws {Error} 请求失败
  **/
  async startApi(id: number) {
    try {
      const response = await this.put('/enableApi/' + id);
      return response;
    } catch (error) {
      console.error('Error starting API:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to start API!',
      });
      throw error;
    }
  }

  /**
   * 添加API
   * @param body 参数数据
   * @returns API详情
   * @throws {Error} 请求失败
   */
  async addApi(body: any) {
    try {
      const response = await this.post('/insertApiKey', body);
      return response;
    } catch (error) {
      console.error('Error adding API:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add API!',
      });
      throw error;
    }
  }
}
