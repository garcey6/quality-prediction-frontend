<template>
  <div class="prediction-result-modal">
    <div class="prediction-result-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">质量预测结果</h3>

      <div class="result-content">
        <!-- 预测结果图表 -->
        <div class="chart-container" v-if="chartImage">
          <img :src="chartImage" style="width: 100%; max-height: 500px; object-fit: contain;">
        </div>

        <!-- 预测详情 -->
        <div class="detail-container">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="预测详情" name="1">
              <!-- 预测指标 (移动到预测详情下方) -->
              <div class="metrics-container">
                <el-table :data="metricsData" border style="width: 100%">
                  <el-table-column prop="name" label="评估指标" width="180"></el-table-column>
                  <el-table-column prop="value" label="数值"></el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>


      </div>

      <div class="form-footer">
        <el-button type="primary" @click="handleExport">导出图片</el-button>
        <el-button @click="$emit('cancel')">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPredictionVisualization, exportPrediction } from '../../api/qualityPrediction'

export default {
  props: {
    modelType: {
      type: String,
      default: 'pls'
    }
  },
  data() {
    return {
      activeNames: ['1'],
      metricsData: [],
      predictionDetails: '',
      chartImage: null,  // 改为存储图片URL
      loading: false
    }
  },
  mounted() {
    this.loadPredictionData()
  },
  methods: {
    async loadPredictionData() {
      this.loading = true
      try {
        const response = await getPredictionVisualization(this.modelType)

        // 处理返回的数据
        this.metricsData = [
          { name: 'RMSE', value: response.metrics.rmse.toFixed(4) },
          { name: 'MAE', value: response.metrics.mae.toFixed(4) },
          { name: 'R²', value: response.metrics.r2.toFixed(4) },
          { name: 'MSE', value: response.metrics.mse.toFixed(4) },
          { name: '样本数', value: response.metrics.样本数 }
        ]

        this.predictionDetails = JSON.stringify(response, null, 2)

        // 确保图片数据格式正确
        this.chartImage = response.image.startsWith('data:image')
          ? response.image
          : `data:image/png;base64,${response.image}`

      } catch (error) {
        this.$message.error('加载预测结果失败: ' + error.message)
      } finally {
        this.loading = false
      }
    },

    // 移除initChart方法及相关方法
    async handleExport() {
      try {
        const response = await exportPrediction(this.modelType)
        
        // 创建下载链接
        const link = document.createElement('a')
        link.href = response.file_path
        link.download = response.file_name
        link.click()
        
        this.$message.success('图片导出成功')
      } catch (error) {
        this.$message.error('导出图片失败: ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.prediction-result-modal {
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

.prediction-result-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 700px;
  max-height: 80vh;
  overflow: auto;
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

.result-content {
  margin: 20px 0;
}

.chart-container {
  margin-bottom: 20px;
}

.metrics-container {
  margin-bottom: 20px;
}

.detail-container {
  margin-bottom: 20px;
}

.form-footer {
  margin-top: 20px;
  text-align: right;
}
</style>