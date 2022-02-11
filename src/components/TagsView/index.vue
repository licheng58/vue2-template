<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :style="{
          backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
          borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
        }"
        v-for="(tag, index) in $store.getters.tagsViewList"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        <span>{{ tag.title }}</span>
        <span @click.prevent.stop="onCloseClick(index)" v-show="!isActive(tag)"
          ><svg-icon className="el-icon-close" icon="close"
        /></span>
      </router-link>
    </el-scrollbar>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>

<script>
import ContextMenu from './ContextMenu.vue'

export default {
  components: {
    ContextMenu
  },

  data() {
    return {
      // contextMenu 相关
      selectIndex: 0,
      visible: false,
      menuStyle: {
        left: 0,
        top: 0
      }
    }
  },

  /**
   * 监听变化
   */
  watch: {
    visible: function (val) {
      if (val) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },

  methods: {
    /**
     * 是否被选中
     */
    isActive(tag) {
      return tag.path === this.$route.path
    },

    /**
     * 关闭 tag 的点击事件
     */
    onCloseClick(index) {
      this.$store.commit('app/removeTagsView', {
        type: 'index',
        index: index
      })
    },

    /**
     * 展示 menu
     */
    openMenu(e, index) {
      const { x, y } = e
      this.menuStyle.left = x + 'px'
      this.menuStyle.top = y + 'px'
      this.selectIndex = index
      this.visible = true
    },

    /**
     * 关闭 menu
     */
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
    }
  }
}
::v-deep .el-scrollbar__view {
  text-align: start;
}
</style>
