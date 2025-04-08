<template>
  <div ref="container" class="canvas-area"></div>
</template>

<script>
import { Graph } from '@antv/x6'

export default {
  data() {
    return {
      graph: null,
    }
  },
  mounted() {
    this.graph = new Graph({
      container: this.$refs.container,
      width: this.$refs.container.clientWidth,
      height: this.$refs.container.clientHeight,
      grid: true,
      panning: true,
      selecting: {
        enabled: true,
        showNodeSelectionBox: true
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      connecting: {
        snap: true,
        allowBlank: false,
        highlight: true,
        connector: 'rounded', // 添加连线样式
        connectionPoint: 'boundary', // 设置连接点类型
        anchor: 'center', // 锚点居中
      }
    })
    // 允许节点拖动
    this.graph.on('node:moved', ({ node }) => {
      console.log('节点移动到:', node.getPosition())
    })
    // 监听连线事件
    this.graph.on('edge:connected', ({ edge }) => {
      console.log('连线成功:', edge)
    })
    // 添加删除支持 - 修改为悬停时显示，离开时隐藏
    this.graph.on('node:mouseenter', ({ node }) => {
      node.addTools({
        name: 'button-remove',
        args: {
          x: '100%',
          y: 0,
          offset: { x: -10, y: 10 },
        }
      })
    })
    
    this.graph.on('node:mouseleave', ({ node }) => {
      node.removeTools()
    })
    // 添加双击事件监听
    this.graph.on('node:dblclick', ({ node }) => {
      console.log('节点被双击:', node) // 添加调试日志
      console.log('传递的参数:', node.getData());
      const data = node.getData()
      this.$emit('node-dblclick', data)
    })
  },
  methods: {
    addNode(moduleData, x, y) {
      const node = this.graph.addNode({
        id: `${moduleData.type}-${Date.now()}`,
        // 添加data属性保存模块数据
        data: {
          ...moduleData,  // 确保包含所有模块数据
          id: `${moduleData.type}-${Date.now()}` // 添加唯一ID
        },
        x,
        y,
        width: 120,
        height: 40,
        label: moduleData.name,
        attrs: {
          body: {
            fill: '#fff',
            stroke: '#000',
            rx: 6,
            ry: 6,
          },
          label: {
            fontSize: 14,
            fill: '#333',
          },
        },
        ports: {
          groups: {
            in: {
              position: 'left',
              attrs: { circle: { r: 4, magnet: true, stroke: '#31d0c6' } }
            },
            out: {
              position: 'right',
              attrs: { circle: { r: 4, magnet: true, stroke: '#31d0c6' } }
            },
            top: {
              position: 'top',
              attrs: { circle: { r: 4, magnet: true, stroke: '#31d0c6' } }
            },
            bottom: {
              position: 'bottom',
              attrs: { circle: { r: 4, magnet: true, stroke: '#31d0c6' } }
            }
          },
          items: [
            { id: 'in-1', group: 'in' },
            { id: 'out-1', group: 'out' },
            { id: 'top-1', group: 'top' },
            { id: 'bottom-1', group: 'bottom' }
          ],
        },
        // 添加右键菜单支持
        attrs: {
          body: {
            fill: '#fff',
            stroke: '#000',
            rx: 6,
            ry: 6,
          },
          label: {
            fontSize: 14,
            fill: '#333',
          },
        },
        draggable: true,
        resizable: true, 
      })
      console.log('创建的新节点数据:', node.getData()) // 调试日志
      }
    }
}
</script>

<style scoped>
.canvas-area {
  flex: 1;
  position: relative;
  background: #e9e4e4;
  overflow: auto;
  padding: 15px;
}
/* 连线样式 */
.x6-edge path {
  stroke: #8f8f8f;
  stroke-width: 1;
}

/* 选中状态 */
.x6-node-selected rect {
  stroke: #ff0000 !important;
  stroke-width: 2px !important;
}

.x6-node-tool-remove {
  background: #ff4d4f !important;
  border-radius: 50% !important;
  width: 20px !important;
  height: 20px !important;
  line-height: 1 !important;
  color: white !important;
  font-size: 14px !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.x6-node-tool-remove:hover {
  background: #ff0000 !important;
}
</style>

