<template>
  <div class="feature-extraction-modal">
    <div class="feature-extraction-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">特征提取设置</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="选择提取方法">
            <el-select v-model="selectedMethod" placeholder="请选择特征提取方法">
              <el-option
                v-for="method in extractionMethods"
                :key="method.value"
                :label="method.label"
                :value="method.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="参数设置" v-if="selectedMethod">
            <div v-if="selectedMethod === 'pca'">
              <el-input-number v-model="pcaParams.n_components" :min="1" label="主成分数量"></el-input-number>
            </div>
            <div v-else-if="selectedMethod === 'lda'">
              <el-input-number v-model="ldaParams.n_components" :min="1" label="降维维度"></el-input-number>
            </div>
            <div v-else-if="selectedMethod === 'tsfresh'">
              <el-checkbox-group v-model="tsfreshParams.features">
                <el-checkbox label="mean">均值</el-checkbox>
                <el-checkbox label="variance">方差</el-checkbox>
                <el-checkbox label="skewness">偏度</el-checkbox>
                <el-checkbox label="kurtosis">峰度</el-checkbox>
              </el-checkbox-group>
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
      selectedMethod: '',
      extractionMethods: [
        { value: 'pca', label: 'PCA主成分分析' },
        { value: 'lda', label: 'LDA线性判别分析' },
        { value: 'tsfresh', label: 'TSFresh时序特征' }
      ],
      pcaParams: {
        n_components: 2
      },
      ldaParams: {
        n_components: 1
      },
      tsfreshParams: {
        features: ['mean', 'variance']
      }
    }
  },
  methods: {
    handleSubmit() {
      let params = {}
      if (this.selectedMethod === 'pca') {
        params = this.pcaParams
      } else if (this.selectedMethod === 'lda') {
        params = this.ldaParams
      } else if (this.selectedMethod === 'tsfresh') {
        params = this.tsfreshParams
      }

      this.$emit('submit', {
        method: this.selectedMethod,
        params
      })
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