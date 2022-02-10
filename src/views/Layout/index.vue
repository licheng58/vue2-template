<template>
  <div class="layout">
    <!-- 左侧 menu -->
    <side-bar class="sidebar-container" :style="{ background: mainColor }" />
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import SideBar from './components/SideBar/index.vue'
import NavBar from './components/NavBar/index.vue'
import AppMain from './components/AppMain/index.vue'
export default {
  components: {
    SideBar,
    NavBar,
    AppMain
  },

  data() {
    return {
      // variables: () => import('@/styles/variables.scss')
    }
  },

  computed: {
    mainColor: function () {
      return this.$store.getters.mainColor
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}

// .sidebar-container {
//   background: #{$menuBg};
// }
</style>
