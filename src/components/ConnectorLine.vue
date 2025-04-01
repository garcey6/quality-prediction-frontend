<template>
  <svg class="connector-line">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
        refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4a90e2"/>
      </marker>
    </defs>
    <line 
      v-for="(conn, index) in connections"
      :key="index"
      :x1="getModulePosition(conn.from).x"
      :y1="getModulePosition(conn.from).y"
      :x2="getModulePosition(conn.to).x"
      :y2="getModulePosition(conn.to).y"
      stroke="#4a90e2"
      stroke-width="2"
      marker-end="url(#arrowhead)" />
  </svg>
</template>

<script>
export default {
  props: ['connections', 'modules'],
  methods: {
    getModulePosition(id) {
      const module = this.modules.find(m => m.id === id);
      if (!module) return {x: 0, y: 0};
      
      // 计算模块中心点
      const centerX = module.x + 75;  // 75是模块宽度的一半
      const centerY = module.y + 45;  // 45是模块高度的一半
      
      // 计算连线起点/终点到连接点的偏移
      return {
        x: centerX,
        y: centerY
      };
    }
  }
}
</script>

<style scoped>
.connector-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>