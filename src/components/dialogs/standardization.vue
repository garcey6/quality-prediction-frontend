<template>
  <div class="standardization-modal">
    <div class="standardization-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">数据标准化</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="选择标准化方法">
            <el-radio-group v-model="selectedMethod">
              <el-radio label="zscore">Z-Score标准化</el-radio>
              <el-radio label="minmax">Min-Max归一化</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="参数设置" v-if="selectedMethod">
            <div v-if="selectedMethod === 'zscore'">
              <el-input-number v-model="zscoreParams.mean" label="均值"></el-input-number>
              <el-input-number v-model="zscoreParams.std" label="标准差" :min="0.1"></el-input-number>
            </div>
            <div v-else>
              <el-input-number v-model="minmaxParams.min" label="最小值"></el-input-number>
              <el-input-number v-model="minmaxParams.max" label="最大值"></el-input-number>
            </div>
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
      selectedMethod: 'zscore',
      zscoreParams: {
        mean: 0,
        std: 1
      },
      minmaxParams: {
        min: 0,
        max: 1
      }
    }
  },
  methods: {
    handleSubmit() {
      const params = this.selectedMethod === 'zscore' 
        ? this.zscoreParams 
        : this.minmaxParams
        
      this.$emit('submit', {
        method: this.selectedMethod,
        params
      })
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

.el-input-number {
  margin-right: 10px;
}
</style>