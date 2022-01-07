import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  Axios,
  AxiosRequestHeaders
} from 'axios';
import { Message } from 'element-ui';

export class Http {
  public instance: Axios;
  constructor() {
    this.instance = axios.create({
      baseURL:
        process.env.NODE_ENV === 'production'
          ? 'http://120.26.11.52'
          : 'http://localhost:3000'
    });
    this.initInterceptor();
  }

  initInterceptor(): void {
    this.instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token: string = window.localStorage.getItem('id_token') || '';
      if (token) {
        (config.headers as AxiosRequestHeaders).authorization = token;
      }
      return config;
    });
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      if (res.headers.authorization) {
        window.localStorage.setItem('id_token', res.headers.authorization);
      } else {
        if (res.data && res.data.token) {
          window.localStorage.setItem('id_token', res.data.token);
        }
      }
      if (res.status == 200) {
        return Promise.resolve(res.data);
      }
    });
  }
  errHandle(res: any): void {
    switch (res.code) {
      case 401:
        Message({
          type: 'error',
          message: '请先登录'
        });
        break;
      case 402:
      case 403:
        break;
      case 404:
        break;
      default:
        Message({
          type: 'error',
          message: '连接失败'
        });
    }
  }
  getInstance(): any {
    return this.instance;
  }
}

const instance = new Http().getInstance();

export default instance;
