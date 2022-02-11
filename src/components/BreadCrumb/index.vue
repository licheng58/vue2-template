<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrunbData"
        :key="item.path"
      >
        <span class="no-redirect" v-if="index === breadcrunbData.length - 1">{{
          generateTitle_(item.meta.title)
        }}</span>
        <span class="redirect" @click.prevent="handleTo(item)" v-else>{{
          generateTitle_(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
export default {
  data() {
    return {
      breadcrunbData: []
    }
  },

  watch: {
    $route: {
      handler: function () {
        this.getBreadcrumbData()
      },
      immediate: true
    }
  },

  methods: {
    getBreadcrumbData() {
      // console.log(this.$route)
      this.breadcrunbData = this.$route.matched.filter((v) => {
        return v.meta && v.meta.title
      })
    },

    handleTo(item) {
      this.$router.push(item.path)
    },

    generateTitle_(val) {
      return generateTitle(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    cursor: pointer;
  }

  .redirect:hover {
    color: #{$menuText};
  }
}
</style>
