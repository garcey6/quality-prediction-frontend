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
      <GraphCanvas ref="graphCanvas" @drop="handleDrop" @data-import="handleDataImport"
        @node-dblclick="handleNodeDblClick" @dragover.prevent />

      <!-- 数据导入弹窗 -->
      <DataImport v-if="isDataImportOpen" :node="selectedNode" @close="isDataImportOpen = false" />
      <!-- 其他弹窗示例 -->
      <DataVisualization v-if="isDataVisualizationOpen" :node="selectedNode" @close="isDataVisualizationOpen = false" />
      <VariableSelection v-if="isVariableSelectionOpen" :node="selectedNode" @close="isVariableSelectionOpen = false" />
      <Standardization v-if="isStandardizationOpen" :node="selectedNode" @close="isStandardizationOpen = false" />
      <ExceptionHandling v-if="isExceptionHandlingOpen" :node="selectedNode" @close="isExceptionHandlingOpen = false" />
      <FeatureSelection v-if="isFeatureSelectionOpen" :node="selectedNode" @close="isFeatureSelectionOpen = false" />
      <FeatureExtraction v-if="isFeatureExtractionOpen" :node="selectedNode" @close="isFeatureExtractionOpen = false" />
      <RNN v-if="isRNNOpen" :node="selectedNode" @close="isRNNOpen = false" />
      <GRU v-if="isGRUOpen" :node="selectedNode" @close="isGRUOpen = false" />
      <LSTM v-if="isLSTMOpen" :node="selectedNode" @close="isLSTMOpen = false" />
      <Transformer v-if="isTransformerOpen" :node="selectedNode" @close="isTransformerOpen = false" />
      <QualityPredictionForm v-if="isQualityPredictionFormOpen" :node="selectedNode"
        @close="isQualityPredictionFormOpen = false" />
      <PLS v-if="isPLSOpen" :node="selectedNode" @close="isPLSOpen = false" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ModulePanel from '../components/ModulePanel.vue'
import GraphCanvas from '../components/GraphCanvas.vue'
import DataImport from '../components/dialogs/DataImport.vue'
import DataVisualization from '../components/dialogs/DataVisualization.vue'
import VariableSelection from '../components/dialogs/VariableSelect.vue'
import Standardization from '../components/dialogs/standardization.vue'
import ExceptionHandling from '../components/dialogs/ExceptionHandling.vue'
import FeatureSelection from '../components/dialogs/FeatureSelection.vue'
import FeatureExtraction from '../components/dialogs/FeatureExtraction.vue'
import RNN from '../components/dialogs/RNN.vue'
import GRU from '../components/dialogs/GRU.vue'
import LSTM from '../components/dialogs/LSTM.vue'
import Transformer from '../components/dialogs/Transformer.vue'
import QualityPredictionForm from '../components/dialogs/QualityPredictionForm.vue'
import PLS from '../components/dialogs/PLS.vue'

export default {
  components: {
    ModulePanel,
    GraphCanvas,
    DataImport,
    DataVisualization,
    VariableSelection,
    Standardization,
    ExceptionHandling,
    FeatureSelection,
    FeatureExtraction,
    PLS,
    RNN,
    GRU,
    LSTM,
    Transformer,
    QualityPredictionForm
  },
  setup() {
    const graphCanvas = ref(null);
    const isDataImportOpen = ref(false);
    const isDataVisualizationOpen = ref(false);
    const isVariableSelectionOpen = ref(false);
    const isStandardizationOpen = ref(false);
    const isExceptionHandlingOpen = ref(false);
    const isFeatureSelectionOpen = ref(false);
    const isFeatureExtractionOpen = ref(false);
    const isPLSOpen = ref(false);
    const isRNNOpen = ref(false);
    const isGRUOpen = ref(false);
    const isLSTMOpen = ref(false);
    const isTransformerOpen = ref(false);
    const isQualityPredictionFormOpen = ref(false);
    const selectedNode = ref(null);

    const handleDragStart = (event, module) => {
      event.dataTransfer.setData('module', JSON.stringify(module));
      event.dataTransfer.effectAllowed = 'copy';
    };

    const handleDrop = (event) => {
      event.preventDefault();
      const moduleData = event.dataTransfer.getData('module');
      if (!moduleData) return;

      const module = JSON.parse(moduleData);
      const rect = graphCanvas.value.$refs.container.getBoundingClientRect(); // 使用 graphCanvas.value
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      graphCanvas.value.addNode(module, x, y); // 使用 graphCanvas.value
    };

    // 处理节点双击事件
    const handleNodeDblClick = (nodeData) => {
      selectedNode.value = nodeData;

      // 根据传递的 type 打开对应的弹窗
      switch (nodeData.type) {
        case 'dataImport':
          isDataImportOpen.value = true;
          break;
        case 'dataVisualization':
          isDataVisualizationOpen.value = true;
          break;
        case 'variableSelect':
          isVariableSelectionOpen.value = true;
          break;
        case 'standardization':
          isStandardizationOpen.value = true;
          break;
        case 'exceptionHandling':
          isExceptionHandlingOpen.value = true;
          break;
        case 'featureSelection':
          isFeatureSelectionOpen.value = true;
          break;
        case 'featureExtraction':
          isFeatureExtractionOpen.value = true;
          break;
        case 'RNN':
          isRNNOpen.value = true;
          break;
        case 'GRU':
          isGRUOpen.value = true;
          break;
        case 'LSTM':
          isLSTMOpen.value = true;
          break;
        case 'Transformer':
          isTransformerOpen.value = true;
          break;
        case 'QualityPrediction':
          isQualityPredictionFormOpen.value = true;
          break;
        case 'PLS':
          isPLSOpen.value = true;
          break;
        default:
          console.warn('未知类型:', nodeData.type);
      }
    };

    return {
      graphCanvas,
      isDataImportOpen,
      isDataVisualizationOpen,
      isVariableSelectionOpen,
      isStandardizationOpen,
      isExceptionHandlingOpen,
      isFeatureSelectionOpen,
      isFeatureExtractionOpen,
      isRNNOpen,
      isGRUOpen,
      isLSTMOpen,
      isTransformerOpen,
      isQualityPredictionFormOpen,
      selectedNode,
      handleDragStart,
      handleDrop,
      handleNodeDblClick,
      isPLSOpen,
    };
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