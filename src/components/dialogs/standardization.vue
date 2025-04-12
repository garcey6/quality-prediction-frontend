<template>
  <div class="standardization-modal">
    <div class="standardization-form">
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>

      <h3 class="dialog-title">数据标准化</h3>

      <div class="form-content">
        <el-form label-position="top">
          <el-form-item label="标准化方法">
            <el-select v-model="selectedMethod">
              <el-option 
                label="Min-Max归一化" 
                value="minmax">
              </el-option>
            </el-select>
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
      loading: false,
      selectedMethod: 'minmax' // 默认选中Min-Max归一化
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        // 直接操作工作副本
        const workingData = this.$store.state.workingData;
        this.applyMinMax(workingData);
        
        this.$message.success('数据归一化已应用');
        this.$emit('submit', {
          success: true,
          data: workingData
        });
      } catch (error) {
        this.$message.error(error.message || '数据归一化失败');
        this.$emit('submit', {
          success: false,
          error: error.message
        });
      } finally {
        this.loading = false;
      }
    },
    
    applyMinMax(data) {
      const stats = this.calculateStats(data);
      
      // 直接修改原数据
      data.forEach(item => {
        for (const key in stats) {
          if (typeof item[key] === 'number') {
            item[key] = (item[key] - stats[key].min) / 
                       (stats[key].max - stats[key].min);
          }
        }
      });
    },
    
    calculateStats(data) {
      const stats = {};
      const keys = Object.keys(data[0]);
      
      // 初始化统计对象
      keys.forEach(key => {
        if (typeof data[0][key] === 'number') {
          stats[key] = {
            min: Infinity,
            max: -Infinity
          };
        }
      });
      
      // 计算最小最大值
      data.forEach(item => {
        for (const key in stats) {
          const val = item[key];
          stats[key].min = Math.min(stats[key].min, val);
          stats[key].max = Math.max(stats[key].max, val);
        }
      });
      
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