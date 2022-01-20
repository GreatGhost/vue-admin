import http from "../index";
interface ILoginForm {
  username?: string;
  password?: string;
}
const loginApi = <T>(params: ILoginForm = {}) => {
  return http.post("/admin/login", params) as T;
};
const getUsers = <T>(page: number, pagesize: number) => {
  return http.post("/admin/users", {
    page,
    pagesize
  }) as T;
};
export { loginApi, getUsers };
