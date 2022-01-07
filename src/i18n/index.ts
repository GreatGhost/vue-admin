import Vue from 'vue';
import VueI18n from 'vue-i18n';

import elementEnLocal from 'element-ui/lib/locale/lang/en';
import elementZhLocal from 'element-ui/lib/locale/lang/zh-CN';
import local from 'element-ui/lib/locale';
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);
const messages = {
  en: {
    ...elementEnLocal,
    ...enLocale
  },
  zh: {
    ...elementZhLocal,
    ...zhLocale
  }
};

const i18n = new VueI18n({
  locale: 'zh',
  messages
});

local.i18n((key: any, value: any) => i18n.t(key, value));

export default i18n;
