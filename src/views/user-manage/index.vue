<template>
  <div class="user-manage-container">
    <!-- 操作 -->
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportexcelClick"
          v-permission="['importUser']"
        >
          {{ $t('excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">
          {{ $t('excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>

    <!-- 表格 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('excel.name')">
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" :label="$t('excel.openTime')">
          <template #default="{ row }">
            {{ row.openTime | dateFilter }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.action')" fixed="right" width="260">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="onShowUserDetail(row._id)"
              >{{ $t('excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="mini"
              @click="onRoleDialog(row._id)"
              v-permission="['distributeRole']"
              >{{ $t('excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <ExportExcel ref="ExportExcel" />
    <roleDialog ref="roleDialog" :userId="selectId" @updateRole="getListData" />
  </div>
</template>

<script>
import { getUserManageList } from '@/api/user-manage'

import { MessageBox, Message } from 'element-ui'
import { deleteUser } from '@/api/user-manage'
import ExportExcel from '@/components/ExportExcel'
import roleDialog from './roleDialog'

export default {
  components: {
    roleDialog,
    ExportExcel
  },

  data() {
    return {
      // 数据相关
      tableData: [],
      total: 0,
      page: 1,
      size: 2,
      exportToExcelVisible: false,
      selectId: ''
    }
  },

  created() {
    this.getListData()
  },

  methods: {
    /**
     * excel 导出点击事件
     */
    onToExcelClick() {
      this.$refs.ExportExcel.dialogVisible = true
    },

    // 获取数据的方法
    async getListData() {
      const result = await getUserManageList({
        page: this.page,
        size: this.size
      })
      this.tableData = result.list
      this.total = result.total
    },

    // 分页相关
    /**
     * size 改变触发
     */
    handleSizeChange(currentSize) {
      this.size = currentSize
      this.getListData()
    },

    /**
     * 页码改变触发
     */
    handleCurrentChange(currentPage) {
      this.page = currentPage
      this.getListData()
    },

    /**
     * excel导入事件
     */

    onImportexcelClick() {
      this.$router.push('/user/import')
    },

    /**
     * 删除按钮点击事件
     */
    onRemoveClick(row) {
      MessageBox.confirm(
        this.$i18n.t('excel.dialogTitle1') +
          row.username +
          this.$i18n.t('excel.dialogTitle2'),
        {
          type: 'warning'
        }
      ).then(async () => {
        await deleteUser(row._id)
        Message.success(this.$i18n.t('excel.removeSuccess'))
        // 重新渲染数据
        this.getListData()
      })
    },

    /**
     * 点击用户详情
     */
    onShowUserDetail(id) {
      this.$router.push(`/user/info/${id}`)
    },

    /**
     * 分配权限弹框
     */
    onRoleDialog(id) {
      this.$refs.roleDialog.dialogVisible = true
      this.selectId = id
    }
  }
}

// 监听语言切换
// watchSwitchLang(getListData)

// 处理导入用户后数据不重新加载的问题
// onActivated(){
//   this.getListData()
// }
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
