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
        <div class="chart-container">
          <div id="prediction-chart" style="width: 100%; height: 300px;"></div>
        </div>

        <!-- 预测指标 -->
        <div class="metrics-container">
          <el-table :data="metricsData" border style="width: 100%">
            <el-table-column prop="name" label="评估指标" width="180"></el-table-column>
            <el-table-column prop="value" label="数值"></el-table-column>
          </el-table>
        </div>

        <!-- 预测详情 -->
        <div class="detail-container">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="预测详情" name="1">
              <pre>{{ predictionDetails }}</pre>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>

      <div class="form-footer">
        <el-button type="primary" @click="handleExport">导出结果</el-button>
        <el-button @click="$emit('cancel')">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    predictionData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeNames: ['1'],
      metricsData: [
        { name: 'RMSE', value: '0.12' },
        { name: 'MAE', value: '0.09' },
        { name: 'R²', value: '0.96' }
      ],
      predictionDetails: '',
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.formatDetails()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('prediction-chart'))
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['实际值', '预测值']
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '实际值',
            type: 'line',
            data: [5.1, 5.3, 5.5, 5.2, 5.4, 5.6, 5.3, 5.5]
          },
          {
            name: '预测值',
            type: 'line',
            data: [5.0, 5.2, 5.4, 5.3, 5.5, 5.5, 5.4, 5.6]
          }
        ]
      }
      this.chart.setOption(option)
    },
    formatDetails() {
      this.predictionDetails = JSON.stringify(this.predictionData, null, 2)
    },
    handleExport() {
      this.$emit('export')
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