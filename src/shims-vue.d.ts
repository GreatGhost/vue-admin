import { Message } from "element-ui";
// declare module '*.vue' {
//   import Vue from 'vue';
//   export default Vue;
// }
declare module "vue/types/vue" {
  interface Vue {
    $http: any;
    $message: Message;
    $logger: function;
  }
}
declare module "element-ui/lib/locale/lang/en";
declare module "element-ui/lib/locale/lang/zh-CN";
declare module "element-ui/lib/locale";
declare module "@/utils/storage";
