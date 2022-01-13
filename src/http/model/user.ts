import http from '../index';
interface ILoginForm {
  username?: string;
  password?: string;
}
const loginApi = (params: ILoginForm = {}): any => {
  return http.post('/admin/login', params);
};
const getUsers = (page: number, pagesize: number): any => {
  return http.post('/admin/users', {
    page,
    pagesize
  });
};
export { loginApi, getUsers };
