<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <svg-icon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { Message } from 'element-ui'

export default {
  props: {
    effect: {
      type: String,
      default: 'dark',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['dark', 'light'].indexOf(value) !== -1
      }
    }
  },

  computed: {
    language: function () {
      return this.$store.getters.language
    }
  },

  methods: {
    handleSetLanguage(lang) {
      // console.log(this.$i18n.locale)
      this.$i18n.locale = lang
      this.$store.commit('app/setLanguage', lang)
      Message.success('更新成功')
    }
  }
}
</script>
