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
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

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
import { getVariables, selectFeatures } from '../../api/featureSelection';

export default {
  data() {
    return {
      targetVariable: '',
      variables: [], // 只存储变量名数组
      correlationThreshold: 0.5,
      loading: false
    }
  },
  async mounted() {
    try {
      this.variables = await getVariables(); // 直接使用API返回的变量名数组
      
      if (this.variables.length === 0) {
        this.$message.warning('未获取到可用变量');
      }
    } catch (error) {
      this.$message.error(error.message);
      console.error('获取变量错误:', error);
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.targetVariable) {
        this.$message.error('请选择目标变量');
        return;
      }
      
      this.loading = true;
      try {
        const response = await selectFeatures(
          this.targetVariable,
          this.correlationThreshold
        );
        
        this.$message.success(response.message);
        this.$emit('submit', {
          targetVariable: this.targetVariable,
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
</style>