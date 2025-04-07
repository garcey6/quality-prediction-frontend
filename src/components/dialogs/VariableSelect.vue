<template>
    <div class="variable-select-form">
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