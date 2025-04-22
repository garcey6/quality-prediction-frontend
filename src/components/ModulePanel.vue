<template>
  <div class="module-panel">
    <div
      v-for="(module, index) in moduleTemplates"
      :key="index"
      class="module-item"
      draggable="true"
      @dragstart="dragStart($event, module)"
    >
      <img :src="module.icon" class="module-icon" />
      <span>{{ module.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moduleTemplates: [
        { name: '数据导入', icon: '/img/2.png', type: 'dataImport' },
        { name: '变量选择', icon: '/img/4.png', type: 'variableSelect' },
        { name: '异常处理', icon: '/img/1.png', type: 'exceptionHandling' },
        { name: '标准化', icon: '/img/5.png', type: 'standardization' },
        { name: '数据可视化', icon: '/img/6.png', type: 'dataVisualization' },
        { name: '特征选择', icon: '/img/7.png', type: 'featureSelection' },
        { name: '特征提取', icon: '/img/8.png', type: 'featureExtraction' },
        { name: 'PLS', icon: '/img/14.png', type: 'PLS' }, // 新增PLS模块
        { name: 'RNN', icon: '/img/9.png', type: 'RNN' },
        { name: 'TCN', icon: '/img/10.png', type: 'TCN' },
        { name: 'LSTM', icon: '/img/11.png', type: 'LSTM' },
        { name: 'Transformer', icon: '/img/12.png', type: 'Transformer' },
        { name: '质量预测', icon: '/img/13.png', type: 'QualityPrediction' },
      ],
    }
  },
  methods: {
    dragStart(event, module) {
      this.$emit('dragStart', event, module)
    },
  },
}
</script>

<style scoped>
.module-panel {
  width: 200px;
  padding: 15px;
  background: #f0f2f5;
  border-right: 1px solid #e8e8e8;
}

.module-item {
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: move;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.module-item:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.module-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
