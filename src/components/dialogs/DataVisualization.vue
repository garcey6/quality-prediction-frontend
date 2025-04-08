<template>
  <div class="visualization-modal">
    <div class="visualization-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">数据可视化设置</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="选择变量">
            <el-transfer
              v-model="selectedVariables"
              :data="variables"
              filterable
              :titles="['可选变量', '已选变量']">
            </el-transfer>
          </el-form-item>

          <el-form-item label="选择图表类型">
            <el-select v-model="chartType" placeholder="请选择图表类型">
              <el-option
                v-for="type in chartTypes"
                :key="type.value"
                :label="type.label"
                :value="type.value">
              </el-option>
            </el-select>
          </el-form-item>
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
export default {
  data() {
    return {
      selectedVariables: [],
      variables: [],
      chartType: 'line',
      chartTypes: [
        { value: 'line', label: '折线图' },
        { value: 'bar', label: '柱状图' },
        { value: 'pie', label: '饼图' },
        { value: 'scatter', label: '散点图' }
      ]
    }
  },
  async mounted() {
    // 获取变量数据
    const response = await this.$http.get('/api/variables')
    this.variables = response.data.map(v => ({
      key: v.id,
      label: v.name
    }))
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', {
        variables: this.selectedVariables,
        chartType: this.chartType
      })
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