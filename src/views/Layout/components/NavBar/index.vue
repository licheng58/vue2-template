<template>
  <div class="navbar">
    <div class="left-menu">
      <!-- 切换侧边栏 -->
      <Hamburger class="hamburger-container" id="guide-hanburger" />
      <!-- 动态面包屑 -->
      <BreadCrumb class="breadcrumb-container" id="guide-breadcrumb" />
    </div>

    <div class="right-menu">
      <!-- 引导 -->
      <Guide class="right-menu-item hover-effect" id="guide-start" />
      <!-- 搜索 -->
      <HeaderSearch class="right-menu-item hover-effect" id="guide-search" />
      <!-- 全屏切换 -->
      <ScreenFull class="right-menu-item hover-effect" id="guide-full" />
      <!-- 主题色 -->
      <ThemeSelect class="right-menu-item hover-effect" id="guide-theme" />
      <!-- 语言切换 -->
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <svg-icon icon="tool" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('navBar.home') }} </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>{{ $t('navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              {{ $t('navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import ThemeSelect from '@/components/ThemeSelect'
import ScreenFull from '@/components/ScreenFull'
import LangSelect from '@/components/LangSelect'
import HeaderSearch from '@/components/HeaderSearch'
import Hamburger from '@/components/Hamburger'
import Guide from '@/components/Guide'
import BreadCrumb from '@/components/BreadCrumb'
export default {
  components: {
    ThemeSelect,
    ScreenFull,
    LangSelect,
    HeaderSearch,
    Hamburger,
    Guide,
    BreadCrumb
  },

  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
    }
    ::v-deep .hover-effect {
      cursor: pointer;
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
