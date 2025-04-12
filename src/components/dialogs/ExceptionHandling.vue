<template>
  <div class="exception-handling-modal">
    <div class="exception-handling-form">
      <!-- 关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <!-- 标题 -->
      <h3 class="dialog-title">异常处理</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="选择处理算法">
            <el-radio-group v-model="selectedAlgorithm">
              <el-radio label="zscore">Z-Score标准化</el-radio>
              <el-radio label="minmax">Min-Max归一化</el-radio>
            </el-radio-group>
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
      selectedAlgorithm: 'zscore',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const workingData = this.$store.state.workingData;
        
        // 本地异常处理
        const processedData = this.processDataLocally(workingData);
        
        // 更新工作数据集
        this.$store.commit('setWorkingData', processedData);
        
        this.$message.success('异常处理已应用');
        this.$emit('submit', {
          success: true,
          data: processedData
        });
      } catch (error) {
        this.$message.error(error.message || '异常处理失败');
        this.$emit('submit', {
          success: false,
          error: error.message
        });
      } finally {
        this.loading = false;
      }
    },
    
    processDataLocally(data) {
      if (!data) return [];
      
      // 根据选择的算法处理数据
      if (this.selectedAlgorithm === 'zscore') {
        return this.applyZScore(data);
      } else if (this.selectedAlgorithm === 'minmax') {
        return this.applyMinMax(data);
      }
      return data;
    },
    
    applyZScore(data) {
      // Z-Score标准化实现
      return data.map(item => {
        const processed = {};
        for (const key in item) {
          if (typeof item[key] === 'number') {
            // 这里需要根据实际数据计算均值和标准差
            const mean = 0; // 实际计算均值
            const std = 1;  // 实际计算标准差
            processed[key] = (item[key] - mean) / std;
          } else {
            processed[key] = item[key];
          }
        }
        return processed;
      });
    },
    
    applyMinMax(data) {
      // Min-Max归一化实现
      return data.map(item => {
        const processed = {};
        for (const key in item) {
          if (typeof item[key] === 'number') {
            // 这里需要根据实际数据计算最小最大值
            const min = 0; // 实际计算最小值
            const max = 1; // 实际计算最大值
            processed[key] = (item[key] - min) / (max - min);
          } else {
            processed[key] = item[key];
          }
        }
        return processed;
      });
    }
  }
}
</script>

<style scoped>
.exception-handling-modal {
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

.exception-handling-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
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

/* 新增标题样式 */
.dialog-title {
  margin: 0 0 20px 0;
  text-align: center;
  color: #333;
}
</style>

