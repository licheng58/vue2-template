<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card" :features="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectCard from './components/projectCard'
import Chapter from './components/chapter'
// eslint-disable-next-line
import Feature from './components/feature'
import Author from './components/author'
import { featureApi } from '@/api/user'
// import { watchSwitchLang } from '@/utils/i18n'

export default {
  components: {
    ProjectCard,
    Chapter,
    Feature,
    Author
  },

  data() {
    return {
      activeName: 'feature',
      featureData: []
    }
  },

  created() {
    this.getFeatureData()
  },

  methods: {
    async getFeatureData() {
      this.featureData = await featureApi()
    }
  }
}

// 监听语言切换
// watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
