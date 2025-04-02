<template>
  <div>
    <!-- 新增顶部导航栏 -->
    <div class="top-navbar">
      <div class="nav-title">间歇过程质量预测系统</div>
      <div class="nav-buttons">
        <button class="nav-button">首页</button>
        <button class="nav-button">我的</button>
        <button class="nav-button">退出</button>
      </div>
    </div>
    
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
      selectedModule: null,
      graph: new Map(), // 使用图结构存储连接关系
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
    handleNodeClick({ id, side }) {
      if (!this.selectedModule) {
        // 选择起始节点
        this.selectedModule = { id, side };
        this.activeModules.forEach(m => {
          m.isSelected = m.id === id;
        });
      } else {
        // 创建连接关系
        const source = this.selectedModule;
        const target = { id, side };
        
        // 检查是否已存在连接
        const existingConnections = this.graph.get(source.id) || [];
        if (!existingConnections.some(conn => conn.target === target.id)) {
          // 更新图结构
          this.graph.set(source.id, [...existingConnections, { 
            target: target.id, 
            sourceSide: source.side,
            targetSide: target.side 
          }]);
          
          // 更新可视化连接
          this.connections.push({
            from: source.id,
            to: target.id,
            fromSide: source.side,
            toSide: target.side
          });
        }
        
        // 重置选择状态
        this.selectedModule = null;
        this.activeModules.forEach(m => m.isSelected = false);
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
    ,
    // 新增：获取节点的连接关系
    getConnections(nodeId) {
      return this.graph.get(nodeId) || [];
    }
    ,
    // 新增：删除连接
    removeConnection(connection) {
      const connections = this.graph.get(connection.from) || [];
      this.graph.set(connection.from, connections.filter(c => 
        c.target !== connection.to || c.sourceSide !== connection.fromSide
      ));
      this.connections = this.connections.filter(c => 
        !(c.from === connection.from && c.to === connection.to && 
          c.fromSide === connection.fromSide)
      );
    }
  }
};
</script>

<style scoped>
/* 新增顶部导航栏样式 */
.top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #1E90FF; /* 蓝色背景 */
  color: white; /* 白色字体 */
}

.nav-title {
  font-size: 20px;
  font-weight: bold;
}

.nav-buttons {
  display: flex;
  gap: 15px;
}

.nav-button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.container {
  display: flex;
  height: calc(100vh - 60px); /* 减去导航栏高度 */
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
  padding: 15px;
}
</style>