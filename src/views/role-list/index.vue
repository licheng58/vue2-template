<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="mini"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
          >
            {{ $t('role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <distribute-permission
      ref="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script>
import { roleList } from '@/api/role'
// import { watchSwitchLang } from '@/utils/i18n';
import DistributePermission from './components/DistributePermission.vue'

export default {
  components: {
    DistributePermission
  },

  data() {
    return {
      allRoles: [],
      selectRoleId: ''
    }
  },

  created() {
    this.getRoleList()
  },

  methods: {
    async getRoleList() {
      this.allRoles = await roleList()
    },

    /**
     * 分配权限
     */
    onDistributePermissionClick(row) {
      this.selectRoleId = row.id
      this.$refs.distributePermissionVisible.dialogVisible = true
    }
  }
}

// watchSwitchLang(getRoleList)
</script>
