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
          <el-form-item label="处理方法">
            <el-select v-model="selectedAlgorithm">
              <el-option 
                label="Z-Score标准化" 
                value="zscore">
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
      selectedAlgorithm: 'zscore',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const workingData = this.$store.state.workingData;
        
        // 直接应用Z-Score标准化
        const processedData = this.applyZScore(workingData);
        
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
    
    applyZScore(data) {
      if (!data || !data.length) return [];
      
      // 计算各数值列的统计量
      const stats = this.calculateStats(data);
      
      return data.map(item => {
        const processed = {};
        for (const key in item) {
          if (typeof item[key] === 'number' && stats[key]) {
            processed[key] = (item[key] - stats[key].mean) / stats[key].std;
          } else {
            processed[key] = item[key];
          }
        }
        return processed;
      });
    },
    
    calculateStats(data) {
      const stats = {};
      const keys = Object.keys(data[0]);
      
      // 初始化统计对象
      keys.forEach(key => {
        if (typeof data[0][key] === 'number') {
          stats[key] = {
            sum: 0,
            sumSq: 0,
            count: 0
          };
        }
      });
      
      // 计算总和和平方和
      data.forEach(item => {
        for (const key in stats) {
          const val = item[key];
          stats[key].sum += val;
          stats[key].sumSq += val * val;
          stats[key].count++;
        }
      });
      
      // 计算均值和标准差
      for (const key in stats) {
        const s = stats[key];
        s.mean = s.sum / s.count;
        s.variance = (s.sumSq - (s.sum * s.sum) / s.count) / s.count;
        s.std = Math.sqrt(s.variance);
      }
      
      return stats;
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

