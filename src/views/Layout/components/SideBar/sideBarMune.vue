<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    :background-color="$store.getters.mainColor"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuAvtiveText"
    :unique-opened="true"
    router
  >
    <sidebar-item
      v-for="item in filterRoutes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from './sidebarItem.vue'
import { filterRouters, generateMenus } from '@/utils/route'
export default {
  name: 'SidebarMune',

  components: {
    SidebarItem
  },

  computed: {
    // 计算高亮 menu 的方法
    activeMenu: function () {
      const { meta, path } = this.$route
      // console.log(this.$route)
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },

    // 计算路由表结构
    filterRoutes: function () {
      const filterRoutes = filterRouters(this.$store.getters.routes)
      return generateMenus(filterRoutes)
    }
  }
}
</script>
