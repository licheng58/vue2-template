<template>
  <div class="theme-select">
    <!-- 主题图标  
  v-bind：https://v3.cn.vuejs.org/api/instance-properties.html#attrs -->
    <el-dropdown
      v-bind="$attrs"
      trigger="click"
      class="theme"
      @command="handleSetTheme"
    >
      <div>
        <el-tooltip :content="$t('navBar.themeChange')">
          <span> <svg-icon icon="change-theme" /></span>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="color">
            {{ $t('theme.themeColorChange') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 展示弹出层 -->
    <select-color ref="selectColor" />
  </div>
</template>

<script>
import selectColor from './selectColor.vue'
export default {
  components: {
    selectColor
  },

  methods: {
    handleSetTheme() {
      this.$refs.selectColor.dialogVisible = true
    }
  }
}
</script>
