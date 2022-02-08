<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />

  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal as external } from '@/utils/validate'
export default {
  props: {
    // icon 图标
    icon: {
      type: String,
      required: true
    },
    // 图标类名
    className: {
      type: String,
      default: ''
    }
  },

  computed: {
    /**
     * 判断是否为外部图标
     */
    isExternal: function () {
      return external(this.icon)
    },
    /**
     * 外部图标样式
     */
    styleExternalIcon: function () {
      return {
        background: `url(${this.icon}) no-repeat 50% 50%`
      }
    },

    /**
     * 项目内图标
     */
    iconName: function () {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  background-size: cover !important;
  display: inline-block;
}
</style>
