<template>
  <div @click="onToggle">
    <el-tooltip :content="$t('navBar.screenfull')">
      <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  data() {
    return {
      isFullscreen: false //是否全屏
    }
  },

  mounted() {
    // 设置侦听器
    screenfull.on('change', this.change)
  },

  beforeDestroy() {
    // 删除侦听器
    screenfull.off('change', this.change)
  },

  methods: {
    // 监听变化
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },

    // 切换事件
    onToggle() {
      screenfull.toggle()
    }
  }
}
</script>

<style lang="scss" scoped></style>
