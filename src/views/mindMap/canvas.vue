<template>
  <div>
    <div class="mini-map-container" ref="miniMapContainerRef"></div>
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { FunctionExt } from '@antv/x6'
import BaseGraph from "./baseGraph";
const { proxy } = getCurrentInstance();

const containerRef = ref(null);
const miniMapContainerRef = ref(null);
onMounted(() => {

  let graph = BaseGraph.init({
    // 画布的容器
    container: containerRef.value,
    // Scroller 后可开启小地图
    minimap: {
      enabled: true,
      container: miniMapContainerRef.value,
    },
  });

  graph.on("node:click", ({ node, e }) => {
    proxy.$EventBus.emit("aside-tabs-activeName", "attr");
    proxy.$EventBus.emit("canvas-select-node", node);
  });
  graph.on("node:added", ({ node, e }) => {
    proxy.$EventBus.emit("aside-tabs-activeName", "attr");
    proxy.$EventBus.emit("canvas-select-node", node);
  });
  graph.on("blank:click", () => {
    proxy.$EventBus.emit("aside-tabs-activeName", "model");
  });
  graph.on("node:resizing", ({ node }) => {
    proxy.$EventBus.emit("canvas-select-node", node);
  });

  graph.on('node:mouseenter', FunctionExt.debounce(({ node }) => {
    // 添加连接点
    const ports = containerRef.value.querySelectorAll('.x6-port-body')
    showPorts(ports, true)
  }), 500)
  graph.on('node:mouseleave', ({ node }) => {
    const ports = containerRef.value.querySelectorAll('.x6-port-body')
    // 添加连接点
    showPorts(ports, false)

  })
  // 显示连线节点
  function showPorts(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

});
</script>


<style>
.container {
  height: calc(100vh - 45px);
}
.mini-map-container {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 220px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.x6-graph-scroller::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  /**/
}
.x6-graph-scroller::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
.x6-graph-scroller::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
.x6-graph-scroller::-webkit-scrollbar-thumb:hover {
  background: #999;
}
.x6-graph-scroller::-webkit-scrollbar-corner {
  background: rgb(239, 239, 239);
}
</style>