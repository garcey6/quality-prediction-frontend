<template>
  <div class="data-import-modal">
    <div class="data-import-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="handleClose">×</span>
      </div>

      <!-- 新增标题 -->
      <h3 class="dialog-title">数据导入</h3>

      <el-upload
        action="#"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleFileChange"
        accept=".csv"
        class="upload-container">
        <el-button type="primary">选择CSV文件</el-button>
      </el-upload>
      
      <div v-if="selectedFile" class="file-info">
        <p>已选择文件：{{ selectedFile.name }}</p>
        <div class="submit-btn-container">
          <el-button 
            type="success" 
            @click="handleUpload"
            :loading="uploading">
            {{ uploading ? '上传中...' : '开始上传' }}
          </el-button>
        </div>
      </div>
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
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.data-import-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.data-import-form {
  width: 300px;
  height: 150px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

/* 新增标题样式 */
.dialog-title {
  margin: 0;
  text-align: center;
  color: #333;
}

.close-btn-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

.close-btn {
  color: #000;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
}

.close-btn:hover {
  color: #666;
}

.upload-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
}

.submit-btn-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.file-info {
  text-align: center;
}
</style>