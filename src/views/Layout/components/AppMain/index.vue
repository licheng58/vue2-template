<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { isTags } from '@/utils/tags'
import { generateTitle } from '@/utils/i18n'
export default {
  data() {
    return {
      value: ''
    }
  },

  /**
   * 监听路由变化
   */
  watch: {
    $route: {
      handler(to) {
        if (!isTags(to.path)) return
        const { fullPath, meta, name, params, path, query } = to
        this.$store.commit('app/addTagsViewList', {
          fullPath,
          meta,
          name,
          params,
          path,
          query,
          title: this.getTitle(to)
        })
      },

      immediate: true
    }
  },
  methods: {
    /**
     * 生成 title
     */
    getTitle(route) {
      let title = ''
      if (!route.meta) {
        // 处理无 meta 的路由
        const pathArr = route.path.split('/')
        title = pathArr[pathArr.length - 1]
      } else {
        title = generateTitle(route.meta.title)
      }
      return title
    }
  }
}

/**
 * 国际化 tags
 */
// watchSwitchLang(() => {
//   store.getters.tagsViewList.forEach((route, index) => {
//     store.commit('app/changeTagsView', {
//       index,
//       tag: {
//         ...route,
//         title: getTitle(route)
//       }
//     })
//   })
// })
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 106px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
