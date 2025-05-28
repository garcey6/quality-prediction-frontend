<template>
  <div class="variable-select-modal">
    <div class="variable-select-form">
      <!-- 添加关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>
      <!-- 添加对话框标题 -->
      <h3 class="dialog-title">目标变量选择</h3>
      <el-transfer v-model="selectedVariables" :data="variables" filterable :titles="['可选变量', '已选变量']">
      </el-transfer>

      <!-- 添加目标变量选择区域 -->
      <div v-if="selectedVariables.length > 0" class="target-select">
        <h4>选择目标变量</h4>
        <el-select v-model="targetVariable" placeholder="请选择目标变量">
          <el-option v-for="varId in selectedVariables" :key="varId" :label="getVariableName(varId)" :value="varId">
          </el-option>
        </el-select>
      </div>

      <div class="form-footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getVariables, selectVariables } from '../../api/variables';

export default {
  props: ['initialData'],
  data() {
    return {
      variables: [],
      selectedVariables: this.initialData?.selected || [],
      loading: false,
      targetVariable: null  // 新增目标变量
    }
  },
  async mounted() {
    try {
      const data = await getVariables();
      this.variables = data.map(v => ({
        key: v.id,
        label: v.name,  // 只显示变量名
        disabled: v.status === 0
      }));
    } catch (error) {
      this.$message.error(error.message);
    }
  },
  methods: {
    getVariableName(varId) {
      const variable = this.variables.find(v => v.key === varId);
      return variable ? variable.label : '';
    },
    async handleSubmit() {
      this.loading = true;
      try {
        if (!this.targetVariable && this.selectedVariables.length > 0) {
          throw new Error('请选择目标变量');
        }

        // 获取变量名而不是ID
        const varNames = this.selectedVariables
          .filter(v => v !== null && v !== undefined)
          .map(v => {
            const variable = this.variables.find(item => item.key === v);
            return variable ? variable.label : null; // 使用label(变量名)而不是key(ID)
          })
          .filter(v => v !== null);

        if (varNames.length === 0) {
          throw new Error('请至少选择一个变量');
        }

        // 获取目标变量名
        const targetVarName = this.targetVariable ?
          this.getVariableName(this.targetVariable) : null;

        const response = await selectVariables(varNames, targetVarName);  // 添加目标变量参数

        this.$message.success('变量选择已应用');
        this.$emit('submit', {
          success: true,
          selectedVariables: this.selectedVariables,
          targetVariable: this.targetVariable,
          targetVariableName: targetVarName,  // 添加目标变量名
          message: response.message
        });
      } catch (error) {
        this.$message.error(error.message);
        this.$emit('submit', {
          success: false,
          error: error.message
        });
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.dialog-title {
  margin: 0 0 20px 0;
  text-align: center;
  color: #333;
}
.variable-select-modal {
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

.variable-select-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-height: 80vh;
  overflow: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  /* 为关闭按钮定位做准备 */
}

/* 添加关闭按钮样式 */
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

.form-footer {
  margin-top: 20px;
  text-align: right;
}

/* 新增目标变量选择样式 */
.target-select {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.target-select h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}
</style>