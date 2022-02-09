<template>
  <div class="app-main">
    {{ $t('theme.themeColorChange') }}

    <el-date-picker v-model="value" type="date" placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
