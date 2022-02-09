import VueI18n from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import { getItem } from '@/utils/storage'
import { LANG } from '@/constant'
import Vue from 'vue'
Vue.use(VueI18n)

const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}

/**
 * 返回当前 lang
 */
function getLanguage() {
  return getItem(LANG) || 'zh'
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})
export default i18n
