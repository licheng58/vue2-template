<template>
  <el-dialog
    :title="$t('excel.roleDialogTitle')"
    :visible.sync="dialogVisible"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { Message } from 'element-ui'
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dialogVisible: false,
      allRoleList: [], // 所有角色
      userRoleTitleList: [] // 当前用户角色
    }
  },

  created() {
    this.getListData()
  },

  watch: {
    userId: function (val) {
      if (val) {
        this.getUserRoles()
      }
    }
  },

  methods: {
    // 获取所有角色数据的方法
    async getListData() {
      this.allRoleList = await roleList()
    },

    // 获取当前用户角色
    async getUserRoles() {
      const res = await userRoles(this.userId)
      this.userRoleTitleList = res.role.map((item) => item.title)
    },

    /**
  确定按钮点击事件
 */
    async onConfirm() {
      // 处理数据结构
      const roles = this.userRoleTitleList.map((title) => {
        return this.allRoleList.find((role) => role.title === title)
      })

      await updateRole(this.userId, roles)

      Message.success(this.$i18n.t('role.updateRoleSuccess'))
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

<style lang="scss" scoped></style>
