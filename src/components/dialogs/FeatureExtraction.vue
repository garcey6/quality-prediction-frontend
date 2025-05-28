<template>
  <div class="feature-extraction-modal">
    <div class="feature-extraction-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">数据降维</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="选择提取方法">
            <el-select v-model="selectedMethod" placeholder="请选择特征提取方法">
              <el-option v-for="method in extractionMethods" :key="method.value" :label="method.label"
                :value="method.value">
              </el-option>
            </el-select>
          </el-form-item>

          <div v-if="selectedMethod === 'pca'">
            <el-slider v-model="pcaParams.variance_threshold" :min="0.85" :max="1" :step="0.01" label="方差保留阈值">
            </el-slider>
            <span>当前阈值: {{ (pcaParams.variance_threshold * 100).toFixed(0) }}%</span>
          </div>
        </el-form>
      </div>

      <div class="form-footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getExtractedFeatures } from '../../api/featureExtraction';

export default {
  data() {
    return {
      selectedMethod: 'pca',
      loading: false,
      extractionMethods: [
        { value: 'pca', label: 'PCA主成分分析' }
      ],
      pcaParams: {
        variance_threshold: 0.98
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        await getExtractedFeatures({
          method: this.selectedMethod,
          variance_threshold: this.pcaParams.variance_threshold
        });
        
        this.$message.success('特征提取参数已设置');
        this.$emit('submit', {
          method: this.selectedMethod,
          variance_threshold: this.pcaParams.variance_threshold
        });
        
      } catch (error) {
        this.$message.error(error.message || '参数设置失败');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.feature-extraction-modal {
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

.feature-extraction-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
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

.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.el-checkbox {
  margin-right: 15px;
}
</style>