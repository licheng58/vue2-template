<template>
  <ImportExcel :onSuccess="onSuccess" />
</template>

<script>
import ImportExcel from '@/components/ImportExcel'
import { userBatchImport } from '@/api/user-manage'
import { Message } from 'element-ui'
import { USER_RELATIONS, formatDate } from './utils'
export default {
  components: {
    ImportExcel
  },

  methods: {
    /**
     * 数据解析成功之后的回调
     */

    /* eslint-disable */
    async onSuccess({ header, results }) {
      const updateData = this.generateData(results)
      await userBatchImport(updateData)
      Message.success({
        message: results.length + this.$i18n.t('excel.importSuccess'),
        type: 'success'
      })
      this.$router.push('/user/manage')
    },

    /**
     * 筛选数据
     */
    generateData(results) {
      const arr = []
      results.forEach((item) => {
        const userInfo = {}
        Object.keys(item).forEach((key) => {
          if (USER_RELATIONS[key] === 'openTime') {
            userInfo[USER_RELATIONS[key]] = formatDate(item[key])
            return
          }
          userInfo[USER_RELATIONS[key]] = item[key]
        })
        arr.push(userInfo)
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped></style>
