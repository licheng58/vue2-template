<template>
  <!-- 支持渲染多级 menu 菜单 -->
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-submenu>
  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script>
import MenuItem from './menuItem.vue'
export default {
  name: 'SidebarItem',
  components: {
    MenuItem
  },

  props: {
    route: {
      type: Object,
      required: true
    }
  }
}
</script>
