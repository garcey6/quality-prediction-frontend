<template>
  <div class="canvas-container">
    <ConnectorLine :connections="connections" :modules="modules"/>
    <DraggableModule
      v-for="module in modules"
      :key="module.id"
      :class="{ selected: module.isSelected }"
      v-bind="module"
      @click="$emit('nodeClick', module)"
      @dblclick="$emit('moduleDblClick', module)"
      @updatePosition="$emit('updatePosition', module.id, $event)"
      @delete="$emit('delete', module.id)"
      @startConnection="$emit('startConnection', $event)"/>
  </div>
</template>

<script>
import DraggableModule from './DraggableModule.vue';
import ConnectorLine from './ConnectorLine.vue';

export default {
  components: { DraggableModule, ConnectorLine },
  props: ['modules', 'connections'],
  emits: ['nodeClick', 'moduleDblClick', 'updatePosition', 'delete']
}
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f8f9fa;  /* 浅灰色背景 */
  border: 2px dashed #ced4da; /* 虚线边框 */
  border-radius: 8px; /* 圆角边框 */
  box-shadow: 0 2px 10px rgba(0,0,0,0.05); /* 轻微阴影 */
}
</style>