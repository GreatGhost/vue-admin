import http from '../index';
interface ILoginForm {
  username?: string;
  password?: string;
}
const loginApi = (params: ILoginForm = {}): any => {
  return http.post('/admin/login', params);
};
const getUsers = (): any => {
  return http.post('/admin/users');
};
export { loginApi, getUsers };
