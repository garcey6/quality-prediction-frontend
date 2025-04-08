<template>
  <div class="transformer-modal">
    <div class="transformer-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">Transformer训练设置</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="网络结构参数">
            <el-input-number v-model="networkParams.d_model" :min="1" label="模型维度"></el-input-number>
            <el-input-number v-model="networkParams.nhead" :min="1" label="注意力头数"></el-input-number>
            <el-input-number v-model="networkParams.num_layers" :min="1" :max="10" label="编码器层数"></el-input-number>
            <el-input-number v-model="networkParams.dim_feedforward" :min="1" label="前馈网络维度"></el-input-number>
            <el-input-number v-model="networkParams.dropout" :min="0" :max="0.9" :step="0.1" label="Dropout率"></el-input-number>
          </el-form-item>

          <el-form-item label="训练参数">
            <el-input-number v-model="trainParams.epochs" :min="1" :max="1000" label="训练轮数"></el-input-number>
            <el-input-number v-model="trainParams.batch_size" :min="1" :max="1024" label="批大小"></el-input-number>
            <el-input-number v-model="trainParams.learning_rate" :min="0.0001" :max="1" :step="0.0001" label="学习率"></el-input-number>
          </el-form-item>

          <el-form-item label="其他参数">
            <el-checkbox v-model="trainParams.early_stopping">早停机制</el-checkbox>
          </el-form-item>
        </el-form>
      </div>

      <div class="form-footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">开始训练</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      networkParams: {
        d_model: 512,
        nhead: 8,
        num_layers: 6,
        dim_feedforward: 2048,
        dropout: 0.1
      },
      trainParams: {
        epochs: 50,
        batch_size: 32,
        learning_rate: 0.001,
        early_stopping: true
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', {
        network_params: this.networkParams,
        train_params: this.trainParams
      })
    }
  }
}
</script>

<style scoped>
.transformer-modal {
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

.transformer-form {
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

.el-input-number {
  margin-right: 15px;
  margin-bottom: 10px;
}
</style>