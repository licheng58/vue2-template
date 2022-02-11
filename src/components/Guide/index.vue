<template>
  <div>
    <el-tooltip :content="$t('navBar.guide')">
      <span @click="onClick"> <svg-icon icon="guide" /></span>
    </el-tooltip>
  </div>
</template>

<script>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from '@/utils/steps'

export default {
  data() {
    return {
      driver: null
    }
  },

  mounted() {
    this.driver = new Driver({
      // 禁止点击蒙版关闭
      allowClose: false,
      closeBtnText: this.$i18n.t('guide.close'),
      nextBtnText: this.$i18n.t('guide.next'),
      prevBtnText: this.$i18n.t('guide.prev')
    })
  },

  methods: {
    onClick() {
      this.driver.defineSteps(steps(this.$i18n))
      this.driver.start()
    }
  }
}
</script>

<style scoped></style>
