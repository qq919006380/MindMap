<template>
  <div v-loading="loading">
    <div class="mini-map-container" ref="miniMapContainerRef"></div>
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { FunctionExt } from '@antv/x6'
import BaseGraph from "./baseGraph";
import hotkeys from 'hotkeys-js';


var obj = JSON.parse(localStorage.getItem('graphCacheData') || '{"nodes":[],"edges":[]}')
let loading = ref(false)
if (obj && (obj.edges.length > 0 || obj.nodes.length > 0)) {
  loading.value = true
  let graphCacheData = JSON.parse(localStorage.getItem('graphCacheData'))
  setTimeout(() => {
    BaseGraph.graph.fromJSON(graphCacheData)
    loading.value = false
  }, 800);
}
let registrationShortcuts = () => {
  let graph = BaseGraph.graph
  graph.bindKey('ctrl+c', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })

  graph.bindKey('ctrl+v', () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })

  hotkeys('alt+q', function (event, handler) {
    event.preventDefault()
    proxy.$EventBus.emit("aside-tabs-toggle");
  });

  hotkeys('ctrl+s', function (event, handler) {
    event.preventDefault()
    proxy.$EventBus.emit("save-canvas-data");
  });
  hotkeys('ctrl+d', function (event, handler) {
    event.preventDefault()
    proxy.$EventBus.emit("clear-canvas-data");
  });
}


const { proxy } = getCurrentInstance();

const containerRef = ref(null);
const miniMapContainerRef = ref(null);
let getSelectedCells = null
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

  registrationShortcuts()
});
/**
 * 注册快捷键
 */

</script>


<style scoped>
.container {
  height: calc(100vh - 45px);
}
.mini-map-container {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 320px;
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