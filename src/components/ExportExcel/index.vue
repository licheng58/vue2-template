<template>
  <el-dialog
    :title="$t('excel.title')"
    :visible.sync="dialogVisible"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './contant'
import { dateFormat } from '@/utils/date'

export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      excelName: '',
      exportDefaultName: this.$i18n.t('excel.defaultName')
    }
  },

  methods: {
    /**
     * 导出按钮点击事件
     */
    async onConfirm() {
      this.loading = true
      let exportDefaultName = (this.excelName = exportDefaultName)
      const allUser = (await getUserManageAllList()).list
      // 导入工具包
      const excel = await import('@/utils/ExportExcel')
      const data = this.formatJson(USER_RELATIONS, allUser)
      excel.export_json_to_excel({
        // excel 表头
        header: Object.keys(USER_RELATIONS),
        // excel 数据（二维数组结构）
        data,
        // 文件名称
        filename: this.excelName || exportDefaultName,
        // 是否自动列宽
        autoWidth: true,
        // 文件类型
        bookType: 'xlsx'
      })
      this.closed()
    },

    // 该方法负责将数组转化成二维数组
    formatJson(headers, rows) {
      // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          // 时间特殊处理
          if (headers[key] === 'openTime') {
            return dateFormat(item[headers[key]])
          }
          // 角色特殊处理
          if (headers[key] === 'role') {
            const roles = item[headers[key]]

            return JSON.stringify(roles.map((role) => role.title))
          }
          return item[headers[key]]
        })
      })
    },

    /**
     * 关闭
     */
    closed() {
      this.loading = false
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
