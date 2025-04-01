<template>
  <vue-draggable-resizable
    :x="x"
    :y="y"
    :w="150"
    :h="90"
    :draggable="true"
    :resizable="false"
    @dragstop="handleDragStop"
    @activated="$emit('click', $event)"
    @dblclick.native="$emit('dblclick')">
    <div class="module-box" @click="handleClick">
      <div 
        class="connection-point top"
        @mousedown.stop="startConnection('top')"></div>
      <div 
        class="connection-point right"
        @mousedown.stop="startConnection('right')"></div>
      <div 
        class="connection-point bottom"
        @mousedown.stop="startConnection('bottom')"></div>
      <div 
        class="connection-point left"
        @mousedown.stop="startConnection('left')"></div>
      
      <img :src="icon" :alt="name" class="module-icon">
      <span class="module-name">{{ name }}</span>
      
      <button class="delete-btn" @click.stop="handleDelete">×</button>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable-next';
import 'vue-draggable-resizable-next/dist/Vue3DraggableResizable.css';

export default {
  props: ['id', 'name', 'x', 'y', 'icon'],
  components: { VueDraggableResizable },
  methods: {
    handleDragStop(x, y) {
      this.$emit('updatePosition', { x, y });
    },
    handleClick() {
      this.$emit('click', {id: this.id, x: this.x, y: this.y});
    },
    handleDelete() {
      this.$emit('delete', this.id);
    },
    startConnection(side) {
      this.$emit('startConnection', {id: this.id, side});
    }
  }
};
</script>

<style scoped>
.module-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  background: #fff; /* 保持模块白色背景 */
  border: 1px solid #dee2e6; /* 添加细边框 */
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

/* 移除transform和hover效果 */
.module-box:hover {
  border: 1px solid #dee2e6;
}

/* 移除悬停效果 */
.module-box:hover {
  border-color: #dee2e6;
}

/* 添加选中状态 */
.module-box.selected {
  border: 2px solid #4a90e2;
}

.connection-point {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #4a90e2;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.connection-point.top {
  top: 0;
  left: 50%;
}

.connection-point.right {
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
}

.connection-point.bottom {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
}

.connection-point.left {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
}

.delete-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: none;
}

.module-box:hover .delete-btn {
  display: block;
}
</style>