<template>
    <div class="data-import-form">
      <el-upload
        action="#"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleFileChange"
        accept=".csv">
        <el-button type="primary">选择CSV文件</el-button>
      </el-upload>
      
      <div v-if="selectedFile" class="file-info">
        <p>已选择文件：{{ selectedFile.name }}</p>
        <el-button 
          type="success" 
          @click="handleUpload"
          :loading="uploading">
          {{ uploading ? '上传中...' : '开始上传' }}
        </el-button>
      </div>
    </div>
  </template>
  
  <script>
  import { uploadData } from '../../api/data.js'
  
  export default {
    data() {
      return {
        selectedFile: null,
        uploading: false
      }
    },
    methods: {
      handleFileChange(file) {
        this.selectedFile = file.raw
      },
      async handleUpload() {
        try {
          this.uploading = true
          const response = await uploadData(this.selectedFile)
          this.$emit('submit', {
            success: true,
            data: response.data
          })
        } catch (error) {
          this.$emit('submit', {
            success: false,
            error: error.message
          })
        } finally {
          this.uploading = false
        }
      }
    }
  }
  </script>