import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/variables.scss'
import primaryColor from '@/styles/element-variables.scss'
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables: variables,
    primaryColor: primaryColor
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      state.variables.menuBg = newColor
      state.mainColor = newColor
      state.primaryColor['$--color-primary'] = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
