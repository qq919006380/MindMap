<template>
  <dl @mousedown="startDragToGraph($event)">
    <dt class="circle start"></dt>
    <dd>开始节点</dd>
  </dl>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import BaseGraph from './baseGraph' //  GraphData, GraphOptions
export default {
  setup() {
    // 拖拽节点新增
    let startDragToGraph = (e) => {
      const graph = this.graph
      let node = null
      node = graph.createNode({
        type: 'startNode',
        shape: 'vue-shape',
        x: 300,
        y: 300,
        width: 60,
        height: 60,
        ports,
        component: 'start-node-component'
      })

      const dnd = new Addon.Dnd({ target: graph })
      dnd.start(node, e)
    }
    onMounted(() => {
      let { graph } = BaseGraph
      console.log('as', graph)
    })

    return { startDragToGraph }

  }
}
</script>

<style>
</style>