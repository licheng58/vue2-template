<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    @close="closed"
    width="22%"
    append-to-body
  >
    <div class="center">
      <p class="title">{{ $t('theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('universal.cancel') }}</el-button>
        <el-button type="primary" @click="comfirm">{{
          $t('universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      mainColor: '',
      // 预定义色值
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
    }
  },

  computed: {
    // 默认色值
    mColor: {
      get: function () {
        return this.$store.getters.mainColor
      },
      set: function (value) {
        this.mainColor = value
      }
    }
  },

  methods: {
    /**
     * 确定
     * 1. 修改主题色
     * 2. 保存最新的主题色
     * 3. 关闭 dialog
     */

    async comfirm() {
      // 1.1 获取主题色
      // const newStyleText = await generateNewStyle(mColor.value)
      // 1.2 写入最新主题色
      // writeNewStyle(newStyleText)
      // 2. 保存最新的主题色
      this.$store.commit('theme/setMainColor', this.mainColor)
      // 3. 关闭 dialog
      this.closed()
    },

    /**
     * 关闭
     */
    closed() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
