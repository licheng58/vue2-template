<template>
  <div :class="{ show: isShow }" class="header-search">
    <span @click.stop="onShowClick">
      <svg-icon id="guide-search" class-name="search-icon" icon="search"
    /></span>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { generateRoutes } from './fuseData'
import Fuse from 'fuse.js'
import { filterRouters } from '@/utils/route'
export default {
  data() {
    return {
      // 控制 search 显示
      isShow: false,
      // el-select 实例
      headerSearchSelectRef: null,
      // search 相关
      search: '',
      // 搜索结果
      searchOptions: [],
      fuseFn: null
    }
  },

  created() {
    this.fuseFn = this.initFuse(this.searchPool)
  },

  computed: {
    // 检索数据源
    searchPool: function () {
      const filterRoutes = filterRouters(this.$store.getters.routes)
      return generateRoutes(filterRoutes)
    }
  },

  /**
   * 监听 search 打开，处理 close 事件
   */
  watch: {
    isShow: function (val) {
      if (val) {
        document.body.addEventListener('click', this.onClose)
      } else {
        document.body.removeEventListener('click', this.onClose)
      }
    }
  },

  methods: {
    onShowClick() {
      this.isShow = !this.isShow
      this.$refs.headerSearchSelectRef.focus()
    },

    // 搜索方法
    querySearch(query) {
      console.log(this.fuse)
      if (query !== '') {
        this.searchOptions = this.fuseFn.search(query)
      } else {
        this.searchOptions = []
      }
    },

    // 选中回调
    onSelectChange(val) {
      this.$router.push(val.path)
      this.onClose()
    },

    /**
     * 搜索库相关
     */
    initFuse(searchPool) {
      console.log(searchPool)
      return new Fuse(searchPool, {
        // 是否按优先级进行排序
        shouldSort: true,
        // 匹配算法放弃的时机， 阈值 0.0 需要完美匹配（字母和位置），阈值 1.0 将匹配任何内容。
        threshold: 0.4,
        // 匹配长度超过这个值的才会被认为是匹配的
        minMatchCharLength: 1,
        // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
        // name：搜索的键
        // weight：对应的权重
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },

    /**
     * 关闭 search 的处理事件
     */
    onClose() {
      this.$refs.headerSearchSelectRef.blur()
      this.isShow = false
      this.searchOptions = []
    }
  }
}

// 处理国际化
// watchSwitchLang(() => {
//   searchPool = computed(() => {
//     const filterRoutes = filterRouters(router.getRoutes())
//     return generateRoutes(filterRoutes)
//   })
//   initFuse(searchPool.value)
// })
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 24px !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
