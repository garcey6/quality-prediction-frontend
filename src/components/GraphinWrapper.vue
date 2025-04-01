<template>
  <Graphin
    :data="data"
    :layout="layout"
    :styles="styles"
    @nodeClick="$emit('nodeClick', $event)"
    @edgeClick="$emit('edgeClick', $event)">
    <slot></slot>
  </Graphin>
</template>

<script>
import { Graphin } from '@antv/graphin';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: { Graphin },
  props: {
    data: Object,
    layout: {
      type: Object,
      default: () => ({
        type: 'graphin-force',
        animation: true,
      }),
    },
    styles: Object,
  },
});
</script>