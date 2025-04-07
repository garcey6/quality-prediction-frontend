<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <div class="top-navbar">
      <div class="nav-title">间歇过程质量预测系统</div>
      <div class="nav-buttons">
        <button class="nav-button">首页</button>
        <button class="nav-button">我的</button>
        <button class="nav-button">退出</button>
      </div>
    </div>

    <div class="main-content">
      <!-- 左侧模块面板 -->
      <ModulePanel @dragStart="handleDragStart" />

      <!-- 右侧X6画布 -->
      <GraphCanvas 
        ref="graphCanvas" 
        @drop="handleDrop" 
        @data-import="handleDataImport"
        @node-dblclick="handleNodeDblClick"
        @dragover.prevent />
      
      <!-- 修改为数据导入弹窗 -->
      <el-dialog 
        :visible.sync="dialogVisible" 
        title="数据导入"
        width="50%">
        <DataImport @submit="handleDataSubmit" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ModulePanel from '../components/ModulePanel.vue'
import GraphCanvas from '../components/GraphCanvas.vue'
import DataImport from '../components/dialogs/DataImport.vue' // 新增导入

export default {
  components: {
    ModulePanel,
    GraphCanvas,
    DataImport // 注册组件
  },
  data() {
    return {
      dialogVisible: false,
      selectedNode: null
    }
  },
  methods: {
    handleDragStart(event, module) {
      event.dataTransfer.setData('module', JSON.stringify(module))
      event.dataTransfer.effectAllowed = 'copy'
    },
    handleDrop(event) {
      event.preventDefault()
      const moduleData = event.dataTransfer.getData('module')
      if (!moduleData) return

      const module = JSON.parse(moduleData)
      const rect = this.$refs.graphCanvas.$refs.container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      this.$refs.graphCanvas.addNode(module, x, y)
    },
    // 新增数据导入处理
    handleDataImport(eventData) {
      console.log('收到数据源配置:', eventData)
      // 这里可以打开数据源配置弹窗
      this.$refs.dataConfigDialog.open(eventData)
    },
    // 处理节点双击事件
    handleNodeDblClick(nodeData) {
      this.selectedNode = null // 先置空确保触发响应式更新
      this.$nextTick(() => {
        this.selectedNode = nodeData
        this.dialogVisible = true
      })
    },
    handleDataSubmit(result) {
      if (result.success) {
        this.$message.success('数据导入成功')
        // 处理导入成功后的逻辑
      } else {
        this.$message.error(`导入失败: ${result.error}`)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
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
  flex-direction: column;
  height: 100vh;
}

.top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #1e90ff;
  color: white;
}

.main-content {
  display: flex;
  height: calc(100vh - 60px);
}
</style>
