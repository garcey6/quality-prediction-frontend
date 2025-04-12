<template>
  <div class="visualization-modal">
    <div class="visualization-form">
      <!-- 关闭按钮和标题保持不变 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <h3 class="dialog-title">间歇过程数据可视化</h3>

      <div class="chart-container" v-if="chartImage">
        <img :src="chartImage" style="width: 100%; max-height: 500px; object-fit: contain;">
      </div>

      <div class="form-footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button 
          type="primary" 
          @click="handleSubmit"
          :loading="loading">
          生成可视化
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      chartImage: null,
      errorMessage: null
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.errorMessage = null;
      try {
        const response = await this.$http.post('/api/visualization/multivariate', {
          data: this.$store.state.workingData
        });
        
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        
        this.chartImage = `data:image/png;base64,${response.data.image}`;
        this.$message.success(response.data.message);
        
      } catch (error) {
        this.errorMessage = '数据可视化失败: ' + error.message;
        this.$message.error(this.errorMessage);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.visualization-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.visualization-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.dialog-title {
  margin: 0 0 20px 0;
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

.form-content {
  margin: 20px 0;
}

.form-footer {
  margin-top: 20px;
  text-align: right;
}
</style>