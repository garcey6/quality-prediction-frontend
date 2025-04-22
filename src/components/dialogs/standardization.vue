<template>
  <div class="standardization-modal">
    <div class="standardization-form">
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <h3 class="dialog-title">数据标准化</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="标准化方法">
            <el-select v-model="selectedMethod">
              <el-option 
                label="Min-Max归一化" 
                value="minmax">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="form-footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button 
          type="primary" 
          @click="handleSubmit"
          :loading="loading">
          确认
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { standardizeData } from '../../api/standardization';

export default {
  data() {
    return {
      loading: false,
      selectedMethod: 'minmax'
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const response = await standardizeData(this.selectedMethod);
        
        this.$message.success('数据标准化已应用');
        this.$emit('submit', {
          success: true,
          message: response.message
        });
      } catch (error) {
        this.$message.error(error.message);
        this.$emit('submit', {
          success: false,
          error: error.message
        });
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.standardization-modal {
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

.standardization-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
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