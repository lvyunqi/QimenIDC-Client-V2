import Http from '@/utils/http'
import Swal from 'sweetalert2';

export default new class Account extends Http {

  /**
   * 根据uuid获取用户信息
   * @param uuid 用户uuid
   * @returns 用户信息
   * @throws {Error} 请求失败
   **/
  async getUserInfoByUuid(uuid: string) {
    try {
      const response = await this.get('/getSysuserByUuid', { uuid });
      return response;
    } catch (error) {
      console.error('Error fetching user info:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch user info!',
      });
      throw error;
    }
  }

  /**
   * 获取超管列表
   * @param page 页码
   * @param size 每页数量
   * @returns 用户列表
   * @throws {Error} 请求失败
  **/
  async getAdminList(page: number, size: number) {
    try {
      const response = await this.get('/getSysuser', { page, size });
      return response;
    } catch (error) {
      console.error('Error fetching admin list:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch admin list!',
      });
      throw error;
    }
  }

  /**
   * 添加超管
   * @param body 请求体
   * @returns 添加结果
   * @throws {Error} 请求失败
   **/
  async addAdmin(body: any) {
    try {
      const response = await this.post('/registerDo', body);
      return response;
    } catch (error) {
      console.error('Error adding admin:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add admin!',
      });
      throw error;
    }
  }

  /**
   * 修改超管
   * @param body 请求体
   * @returns 删除结果
   * @throws {Error} 请求失败
   **/
  async updateAdmin(body: any) {
    try {
      const response = await this.post('/updateSysuser', body);
      return response;
    } catch (error) {
      console.error('Error updating admin:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update admin!',
      });
      throw error;
    }
  }

  /**
   * 删除超管
   * @param id 用户ID
   * @returns 删除结果
   * @throws {Error} 请求失败
   **/
  async deleteAdmin(id: number) {
    try {
      const response = await this.delete('/deleteSysUserById/'+id);
      return response;
    } catch (error) {
      console.error('Error deleting admin:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete admin!',
      });
      throw error;
    }
  }
}