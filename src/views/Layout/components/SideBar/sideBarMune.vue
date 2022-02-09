<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#f4f4f5"
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

  created() {
    console.log(233)
  },

  computed: {
    // 计算高亮 menu 的方法
    activeMenu: function () {
      const { meta, path } = this.$route
      console.log(this.$route)
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },

    // 计算路由表结构
    filterRoutes: function () {
      const filterRoutes = filterRouters(this.$router.getRoutes())
      console.log(filterRoutes)
      return generateMenus(filterRoutes)
    }
  }
}
</script>
