import VueI18n from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import { getItem } from '@/utils/storage'
import { LANG } from '@/constant'
import lang_en from "element-ui/lib/locale/lang/en";
import lang_zh from "element-ui/lib/locale/lang/zh-CN";
import el_local from "element-ui/lib/locale";

const messages = {
  en: {
    ...mEnLocale,
    ...lang_en
  },
  zh: {
    ...mZhLocale,
    ...lang_zh
  }
}
import Vue from 'vue'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: getItem(LANG) || 'zh',
  messages
})

el_local.i18n((key, value) => i18n.t(key, value))
export default i18n
