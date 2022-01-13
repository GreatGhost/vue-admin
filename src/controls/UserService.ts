import http from '@/http';
import Store from '@/store';
import { Message } from 'element-ui';
import qs from 'qs';
interface IUserParam {
  username: string;
  password: string;
}
abstract class UserService {
  /* 登录
   * username 用户名
   * password 密码
   */
  static login(params: IUserParam) {
    return new Promise((resolve, reject) => {
      return http
        .post('/admin/login', qs.stringify(params))
        .then((res: any) => {
          if (res.code == 0) {
            Message.success('登录成功');
            UserService.updateStorage(res);
            resolve(res);
          } else {
            Message.error(res.msg);
            reject(res);
          }
        });
    });
  }

  /* 接口名称：注册
   * 参数：params
   * username 用户名
   * password 密码
   */
  static register(params: IUserParam) {
    return new Promise((resolve, reject) => {
      http.post('/admin/register', qs.stringify(params)).then((res) => {
        if (res.code == 0) {
          Message({
            message: '注册成功',
            type: 'success'
          });
          this.updateStorage(res);
          resolve(res);
        } else {
          Message(res.msg);
          reject(res);
        }
      });
    });
  }

  // 更新用户信息
  static updateStorage(res: any) {
    Store.commit('setToken', res.token);
    Store.commit('setUserInfo', res.data.username);
  }

  // 退出登录
  static logout() {
    UserService.updateStorage({
      token: '',
      data: {
        username: ''
      }
    });
  }
}

export default UserService;
