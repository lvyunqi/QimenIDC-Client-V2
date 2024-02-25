import Http from '@/utils/http'
import Swal from 'sweetalert2';

export default new class VncList extends Http {
  /**
   * 获取VNC列表
   * @param page 页码
   * @param size 每页数量
   * @returns VNC列表
   * @throws {Error} 请求失败
  **/
  async getVncList(page: number, size: number) {
    try {
      const response = await this.get('/selectVncNodePage', { page, size });
      return response;
    } catch (error) {
      console.error('Error fetching VNC list:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch VNC list!',
      });
      throw error; // 重新抛出错误，以便其他地方处理
    }
  }

  /**
   * 删除VNC
   * @param id VNC ID
   * @returns 删除结果
   * @throws {Error} 请求失败
   **/
  async deleteVnc(id: number) {
    try {
      const response = await this.delete('/deleteVncNode?id=' + id);
      return response;
    } catch (error) {
      console.error('Error deleting VNC:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete VNC!',
      });
      throw error;
    }
  }

  /**
   * 添加VNC控制器
   * @param body 请求体
   * @returns 添加结果
   * @throws {Error} 请求失败
   **/
  async addVnc(body: any) {
    try {
      const response = await this.post('/addVncNode', body);
      return response;
    } catch (error) {
      console.error('Error adding VNC:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add VNC!',
      });
      throw error;
    }
  }

  /**
   * 修改VNC控制器
   * @param body 请求体
   * @returns 修改结果
   * @throws {Error} 请求失败
   **/
  async updateVnc(body: any) {
    try {
      const response = await this.post('/updateVncNode', body);
      return response;
    } catch (error) {
      console.error('Error updating VNC:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update VNC!',
      });
      throw error;
    }
  }
}