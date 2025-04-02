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
    // 修复2：修正删除按钮配置
    this.graph.on('node:mouseenter', ({ node }) => {
      node.addTools({
        name: 'button-remove',
        args: {
          x: '100%', 
          y: 0,
          offset: { x: -20, y: 20 },
          onClick: () => {
            const edges = this.graph.getConnectedEdges(node)
            this.graph.removeCells([node, ...edges])
          }
        }
      })
    })
    
    // 修复3：简化键盘删除绑定
    this.graph.bindKey('delete', () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        this.graph.removeCells(cells)
      }
    })
    // 添加删除支持
    this.graph.on('node:mouseenter', ({ node }) => {
      node.addTools({
        name: 'button-remove',
        args: {
          x: '100%',
          y: 0,
          offset: { x: -10, y: 10 },
        },
      })
    })
    // 保留键盘删除支持
    this.graph.bindKey(['backspace', 'delete'], () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        this.graph.removeCells(cells)
      }
    })
    
    // 启用框选
    this.graph.enableSelection({
      enabled: true,
      showNodeSelectionBox: true
    })
  },
  methods: {
    addNode(moduleData, x, y) {
      const node = this.graph.addNode({
        id: `${moduleData.type}-${Date.now()}`,
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
      console.log('新节点:', node)
      // 新增点击事件监听
      node.on('click', async ({ cell }) => {
        if (moduleData.type === 'dataImport') {
          await this.handleDataImport(cell.id)
        }
      })
      },
      // 新增数据导入处理方法
      async handleDataImport(nodeId) {
        try {
          const response = await this.$http.get('/api/data-source', {
            params: { nodeId }
          })
          
          this.$emit('data-import', {
            nodeId,
            data: response.data,
            position: this.graph.getCellById(nodeId).getPosition()
          })
          
        } catch (error) {
          console.error('数据源请求失败:', error)
          this.$message.error('获取数据源配置失败')
        }
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

