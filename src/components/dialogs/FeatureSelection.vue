<template>
  <div class="feature-selection-modal">
    <div class="feature-selection-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">特征选择设置</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="选择目标变量">
            <el-select v-model="targetVariable" placeholder="请选择目标变量">
              <el-option
                v-for="item in variables"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择特征变量">
            <el-transfer
              v-model="selectedFeatures"
              :data="features"
              filterable
              :titles="['可选特征', '已选特征']">
            </el-transfer>
          </el-form-item>

          <el-form-item label="相关系数阈值">
            <el-slider
              v-model="correlationThreshold"
              :min="0"
              :max="1"
              :step="0.01"
              show-input>
            </el-slider>
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
      targetVariable: '',
      selectedFeatures: [],
      variables: [],
      features: [],
      correlationThreshold: 0.5
    }
  },
  async mounted() {
    // 获取变量数据
    const response = await this.$http.get('/api/variables')
    this.variables = response.data.map(v => ({
      key: v.id,
      label: v.name
    }))
    this.features = [...this.variables] // 初始时所有变量都作为候选特征
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', {
        targetVariable: this.targetVariable,
        selectedFeatures: this.selectedFeatures,
        correlationThreshold: this.correlationThreshold,
        method: 'pearson' // 指定使用皮尔逊相关系数
      })
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
</style>