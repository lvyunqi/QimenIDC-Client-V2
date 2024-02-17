import Http from '@/utils/http'
import Swal from 'sweetalert2';

export default new class Setting extends Http {
  /**
   * 获取设置列表
   * @returns 设置列表
   * @throws {Error} 请求失败
  **/
  async getSettingList() {
    try {
      const response = await this.get('/getAllConfig');
      return response;
    } catch (error) {
      console.error('Error fetching setting list:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch setting list!',
      });
      throw error;
    }
  }

  /**
   * 更新设置
   * @param body 请求体
   * @returns 更新结果
   * @throws {Error} 请求失败
   **/
  async updateSetting(body: any) {
    try {
      const response = await this.put('/updateConfig', body);
      return response;
    } catch (error) {
      console.error('Error updating setting:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update setting!',
      });
      throw error;
    }
  }
}
