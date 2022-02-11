<template>
  <el-dialog
    :title="$t('excel.roleDialogTitle')"
    :visible.sync="dialogVisible"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>

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
import { permissionList } from '@/api/permission'
// import { watchSwitchLang } from '@/utils/i18n'
import { rolePermission, distributePermission } from '@/api/role'
import { Message } from 'element-ui'

export default {
  props: {
    roleId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dialogVisible: false,
      allPermission: [],
      // 属性结构配置
      defaultProps: {
        children: 'children',
        label: 'permissionName'
      }
    }
  },

  watch: {
    roleId: function (val) {
      if (val) this.getRolePermission()
    }
  },

  created() {
    this.getPermissionList()
  },

  methods: {
    // 所有权限
    async getPermissionList() {
      this.allPermission = await permissionList()
    },

    // 获取当前用户角色的权限
    async getRolePermission() {
      const checkedKeys = await rolePermission(this.roleId)
      this.$refs.treeRef.setCheckedKeys(checkedKeys)
    },

    /**
  确定按钮点击事件
 */
    async onConfirm() {
      await distributePermission({
        roleId: this.roleId,
        permissions: this.$refs.treeRef.getCheckedKeys()
      })
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

// watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
