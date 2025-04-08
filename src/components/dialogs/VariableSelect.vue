<template>
  <div class="variable-select-modal">
    <div class="variable-select-form">
      <!-- 添加关闭按钮 -->
      <div class="close-btn-container">
        <span class="close-btn" @click="$emit('close')">×</span>
      </div>
      
      <el-transfer
        v-model="selectedVariables"
        :data="variables"
        filterable
        :titles="['可选变量', '已选变量']">
      </el-transfer>
      
      <div class="form-footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['initialData'],
  data() {
    return {
      variables: [],
      selectedVariables: this.initialData?.selected || []
    }
  },
  async mounted() {
    const response = await this.$http.get('/api/variables')
    this.variables = response.data.map(v => ({
      key: v.id,
      label: v.name,
      disabled: v.status === 0
    }))
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', {
        selectedVariables: this.selectedVariables
      })
    }
  }
}
</script>

<style scoped>
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
  position: relative; /* 为关闭按钮定位做准备 */
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
</style>