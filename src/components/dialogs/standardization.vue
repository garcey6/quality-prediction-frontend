<template>
  <div class="standardization-modal">
    <div class="standardization-form">
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <h3 class="dialog-title">数据标准化</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="选择标准化方法">
            <el-radio-group v-model="selectedMethod">
              <el-radio label="zscore">Z-Score标准化</el-radio>
              <el-radio label="minmax">Min-Max归一化</el-radio>
            </el-radio-group>
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
export default {
  data() {
    return {
      selectedMethod: 'zscore',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const workingData = this.$store.state.workingData;
        const processedData = this.processData(workingData);
        
        this.$store.commit('setWorkingData', processedData);
        
        this.$message.success('数据标准化已应用');
        this.$emit('submit', {
          success: true,
          data: processedData
        });
      } catch (error) {
        this.$message.error(error.message || '数据标准化失败');
        this.$emit('submit', {
          success: false,
          error: error.message
        });
      } finally {
        this.loading = false;
      }
    },
    
    processData(data) {
      if (!data || !data.length) return [];
      
      if (this.selectedMethod === 'zscore') {
        return this.applyZScore(data);
      } else {
        return this.applyMinMax(data);
      }
    },
    
    applyZScore(data) {
      const stats = this.calculateStats(data);
      
      return data.map(item => {
        const processed = {};
        for (const key in item) {
          if (typeof item[key] === 'number') {
            processed[key] = (item[key] - stats[key].mean) / stats[key].std;
          } else {
            processed[key] = item[key];
          }
        }
        return processed;
      });
    },
    
    applyMinMax(data) {
      const stats = this.calculateStats(data);
      
      return data.map(item => {
        const processed = {};
        for (const key in item) {
          if (typeof item[key] === 'number') {
            processed[key] = (item[key] - stats[key].min) / 
                           (stats[key].max - stats[key].min);
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
            min: Infinity,
            max: -Infinity,
            count: 0
          };
        }
      });
      
      // 计算总和、平方和、最小最大值
      data.forEach(item => {
        for (const key in stats) {
          const val = item[key];
          stats[key].sum += val;
          stats[key].sumSq += val * val;
          stats[key].min = Math.min(stats[key].min, val);
          stats[key].max = Math.max(stats[key].max, val);
          stats[key].count++;
        }
      });
      
      // 计算最终统计量
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
</style>