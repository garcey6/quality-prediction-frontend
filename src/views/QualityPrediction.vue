<template>
  <div class="container">
    <!-- 左侧模块面板 -->
    <div class="module-panel">
      <div 
        v-for="(module, index) in moduleTemplates" 
        :key="index"
        class="module-item"
        draggable="true"
        @dragstart="handleDragStart($event, module)">
        <img :src="module.icon" class="module-icon">
        <span>{{ module.name }}</span>
      </div>
    </div>

    <!-- 右侧画布区域 -->
    <div 
      class="canvas-area" 
      @drop="handleDrop" 
      @dragover.prevent>
      <FlowCanvas 
        :modules="activeModules"
        :connections="connections"
        @nodeClick="handleNodeClick"
        @moduleDblClick="handleModuleDblClick"
        @updatePosition="updateModulePosition"
        @delete="handleDeleteModule"/>
    </div>
  </div>
</template>

<script>
import FlowCanvas from '../components/FlowCanvas.vue';

export default {
  components: { FlowCanvas },
  data() {
    return {
      moduleTemplates: [
        { name: '数据导入', icon: '/img/1.png', type: 'dataImport' },
        { name: '变量选择', icon: '/img/2.png', type: 'variableSelect' },
        { name: '异常处理', icon: '/img/3.png', type: 'exceptionHandling' },
        { name: '标准化', icon: '/img/4.png', type: 'standardization' },
        { name: '数据可视化', icon: '/img/5.png', type: 'dataVisualization' },
        { name: '特征选择', icon: '/img/6.png', type: 'featureSelection' },
        { name: '特征提取', icon: '/img/7.png', type:'featureExtraction' },
        { name: 'RNN', icon: '/img/8.png', type:'RNN' },
        { name: 'TCN', icon: '/img/9.png', type:'TCN' },
        { name: 'LSTM', icon: '/img/10.png', type:'LSTM' },
        { name: 'Transformer', icon: '/img/12.png', type:'Transformer' },
        { name: '质量预测', icon: '/img/13.png', type:'QualityPrediction' },
        // 其他模块...
      ],
      activeModules: [],
      nextId: 0,
      connections: [],
      selectedModule: null
    };
  },
  methods: {
    handleDragStart(event, module) {
      event.dataTransfer.setData('module', JSON.stringify(module));
      event.dataTransfer.effectAllowed = 'copy';
    },
    handleDrop(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const moduleData = JSON.parse(event.dataTransfer.getData('module'));
      this.activeModules.push({
        ...moduleData,
        id: this.nextId++,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    },
    handleModuleClick(module) {
      // 根据模块类型调用不同后端接口
      console.log('Module clicked:', module);
    },
    updateModulePosition(id, position) {
      const module = this.activeModules.find(m => m.id === id);
      if (module) {
        module.x = position.x;
        module.y = position.y;
      }
    },
    handleDeleteModule(id) {
      this.activeModules = this.activeModules.filter(module => module.id !== id);
    },
    drawConnections() {
      // 这个方法需要在FlowCanvas中实现连线绘制
      this.$refs.flowCanvas.drawConnections(this.connections);
    },
    handleNodeClick(module) {
      if (!this.selectedModule) {
        this.selectedModule = module;
        this.activeModules.forEach(m => {
          m.isSelected = m.id === module.id;
        });
      } else if (this.selectedModule.id !== module.id) {
        this.connections.push({
          from: this.selectedModule.id,
          to: module.id,
          fromSide: this.selectedSide,
          toSide: 'top' // 默认连接到目标模块顶部
        });
        this.selectedModule = null;
        this.selectedSide = null;
        this.activeModules.forEach(m => {
          m.isSelected = false;
        });
      }
    },
    handleModuleDblClick(module) {
      // 根据模块类型调用不同后端接口
      console.log('Module clicked:', module);
    },
    updateModulePosition(id, position) {
      const module = this.activeModules.find(m => m.id === id);
      if (module) {
        module.x = position.x;
        module.y = position.y;
      }
    },
    handleDeleteModule(id) {
      this.activeModules = this.activeModules.filter(module => module.id !== id);
    },
    drawConnections() {
      // 这个方法需要在FlowCanvas中实现连线绘制
      this.$refs.flowCanvas.drawConnections(this.connections);
    },
    handleStartConnection({id, side}) {
      this.selectedModule = this.activeModules.find(m => m.id === id);
      this.selectedSide = side;
      this.activeModules.forEach(m => {
        m.isSelected = m.id === id;
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

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
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: move;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.module-item:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.module-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.canvas-area {
  flex: 1;
  position: relative;
  background: #e9e4e4;
  overflow: auto;
}
</style>