<template>
  <div class="rnn-modal">
    <div class="rnn-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">RNN预测</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="RNN类型">
            <el-radio-group v-model="rnnType">
              <el-radio label="SimpleRNN">简单RNN</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <div class="form-footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          开始预测
        </el-button>
      </div>

      <!-- 结果显示区域 -->
      <div v-if="result" class="result-section">
        <h4>预测结果</h4>
        <div>均方误差(MSE): {{ result.mse.toFixed(4) }}</div>
        <div>R²得分: {{ result.r2_score.toFixed(4) }}</div>
        <div>训练轮数: {{ result.epochs }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { predictRNN } from '../../api/rnn';
import { mapMutations } from 'vuex';

export default {
  props: {
    node: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      rnnType: 'SimpleRNN',
      networkParams: {
        hidden_units: 64,
        num_layers: 1,
        bidirectional: false
      },
      trainParams: {
        epochs: 50,
        batch_size: 32,
        learning_rate: 0.001,
        early_stopping: true
      },
      loading: false,
      result: null
    }
  },
  methods: {
    ...mapMutations(['setModelType']),
    
    async handleSubmit() {
      this.loading = true;
      try {
        const response = await predictRNN({
          rnn_type: this.rnnType,
          network_params: this.networkParams,
          train_params: this.trainParams
        });
        
        if (!response.data || response.data.status === 'error') {
          throw new Error(response.data?.message || 'RNN预测失败');
        }

        this.result = {
          mse: response.data.data.mse || 0,
          r2_score: response.data.data.r2_score || 0,
          epochs: response.data.data.epochs || 0
        };
        
        this.$message.success(response.data.message || 'RNN预测完成');
        this.setModelType('rnn');
        
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || 'RNN预测失败';
        this.$message.error(errorMsg);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.rnn-modal {
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

.rnn-form {
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

.result-section {
  margin-top: 30px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.result-section h4 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

.el-input-number {
  margin-right: 15px;
  margin-bottom: 10px;
}
</style>