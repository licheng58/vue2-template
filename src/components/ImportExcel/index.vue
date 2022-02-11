<template>
  <div class="upload-excel">
    <!-- btn导入 -->
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <!-- 拖拽导入 -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { getHeaderRow } from '@/utils/getHeaderRow'
import { isExcel } from '@/utils/isExcel'
import { Message } from 'element-ui'

export default {
  props: {
    //   上传前回调
    beforeUnload: Function,
    // 成功回调
    onSuccess: Function
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    /**
     * btn导入
     */
    handleUpload() {
      this.$refs.excelUploadInput.click()
    },

    handleChange(e) {
      const files = e.target.files
      const rawFile = files[0] //上传一个文件
      if (!rawFile) return
      this.upload(rawFile)
    },

    /**
     * 触发上传事件
     */
    upload(rawFile) {
      // 如果没有指定上传前回调
      if (!this.beforeUpload) {
        this.readData(rawFile)
        return
      }
    },

    /**
     * 读取数据（异步）
     */
    readData(rawFile) {
      this.loading = true
      return new Promise((resolve) => {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
        const reader = new FileReader()
        // 该事件在读取操作完成时触发
        // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
        reader.onload = (e) => {
          // 1. 获取解析到的数据
          const data = e.target.result
          // 2. 利用 XLSX 对数据进行解析
          const workbook = XLSX.read(data, { type: 'array' })
          // 3. 获取第一张表格(工作簿)名称
          const firstSheetName = workbook.SheetNames[0]
          // 4. 只读取 Sheet1（第一张表格）的数据
          const worksheet = workbook.Sheets[firstSheetName]
          // 5. 解析数据表头
          const header = getHeaderRow(worksheet)
          // 6. 解析数据体
          const results = XLSX.utils.sheet_to_json(worksheet)
          // 7. 传入解析之后的数据
          this.generateData({ header, results })
          // 8. loading 处理
          this.loading = false
          // 9. 异步完成
          resolve()
        }
        // 启动读取指定的 Blob 或 File 内容
        reader.readAsArrayBuffer(rawFile)
      })
    },

    /**
     * 根据导入的内容，生产数据
     */
    generateData(excelData) {
      this.onSuccess && this.onSuccess(excelData)
    },

    /**
     * 拖拽文本释放时触发
     */
    handleDrop(e) {
      //   上传中跳过
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        Message.error('必须要有一个文件')
        return
      }

      const rawFile = files[0]
      if (!isExcel(rawFile)) {
        Message.error('文件必须时.xlsx,.xls,.csv格式')
        return false
      }
      this.upload(rawFile)
    },

    /**
     * 拖拽悬停时触发
     */
    handleDragover(e) {
      //   在新位置生产原来的副本
      e.dataTransfer.dropEffect = 'copy'
    }
  }

  // 如果指定了上传前的回调，那么只有返回true的时候才执行
  //   const before = props.beforeUnload(rawFile)
  //   if (before) {
  //     readData(rawFile)
  //   }
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
