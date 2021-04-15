import Vue from "vue";
import VueI18n from 'vue-i18n'
// import {getLanguage} from '@api/i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhLocale from '../i18n/zh'
import enLocale from '../i18n/en'

Vue.use(VueI18n);
const chooseLanguage = localStorage.getItem("qvnas_language")||navigator.language || navigator.browserLanguage||'zh-CN';
localStorage.setItem("qvnas_language",chooseLanguage);
const messages = {
  'zh-CN': {
    ...zhLocale,
    ...elementZhLocale
  },
  'en': {
    ...enLocale,
    ...elementEnLocale
  }
}

// 国际化设置
const i18n = new VueI18n({
// 设置地区
  locale:chooseLanguage,
// 设置地区信息
  messages,
  silentTranslationWarn: true
})
export default i18n
