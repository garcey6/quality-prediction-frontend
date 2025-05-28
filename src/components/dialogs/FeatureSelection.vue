<template>
  <div class="feature-selection-modal">
    <div class="feature-selection-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">特征选择</h3>

      <div class="form-content">
        <!-- 相关系数阈值滑块 -->
        <el-form label-position="top">
          <el-form-item label="相关系数阈值">
            <el-slider
              v-model.number="correlationThreshold"
              :min="0"
              :max="1"
              :step="0.01"
              show-input>
            </el-slider>
            <span style="margin-left: 10px">当前阈值: {{ correlationThreshold.toFixed(2) }}</span>
          </el-form-item>
        </el-form>

        <!-- 相关热力图 -->
        <div class="chart-container" v-if="heatmapImage">
          <h4>变量相关热力图</h4>
          <img :src="heatmapImage" style="width: 100%; max-height: 500px; object-fit: contain;">
        </div>
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
import { getHeatmap, selectFeatures } from '../../api/featureSelection';

export default {
  data() {
    return {
      heatmapImage: null,
      correlationThreshold: 0.5,
      loading: false
    }
  },
  async mounted() {
    await this.loadHeatmap();
  },
  methods: {
    async loadHeatmap() {
      this.loading = true;
      try {
        const response = await getHeatmap();
        if (response && response.image) {
          this.heatmapImage = `data:image/png;base64,${response.image}`;
        }
      } catch (error) {
        this.$message.error('加载热力图失败: ' + error.message);
      } finally {
        this.loading = false;
      }
    },
    async handleSubmit() {
      this.loading = true;
      try {
        const response = await selectFeatures(this.correlationThreshold);
        this.$message.success(response.message);
        this.$emit('submit', {
          correlationThreshold: this.correlationThreshold,
          selectedFeatures: response.selected_features
        });
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.feature-selection-modal {
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

.feature-selection-form {
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

.chart-container {
  margin-top: 20px;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #eee;
}

.chart-container h4 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
  color: #333;
}
</style>