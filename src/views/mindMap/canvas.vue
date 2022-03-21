<template>
  <div v-loading="loading">
    <div class="mini-map-container" ref="miniMapContainerRef"></div>
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useStore } from 'vuex'

import { FunctionExt } from '@antv/x6'
import BaseGraph from "./graph/baseGraph";
import hotkeys from 'hotkeys-js';

const store = useStore()

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

  let history = graph.history
  let state = {
    canRedo: false,
    canUndo: false,
  }
  history.on('change', () => {
    state = {
      canRedo: history.canRedo(),
      canUndo: history.canUndo(),
    }
  })
  graph.bindKey('ctrl+z', () => {
    history.undo()
  })
  graph.bindKey('ctrl+y', () => {
    history.redo()
  })
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
  function setCurEditData2(edge) {
    window.e = edge
    store.commit({
      type: 'editor/setCurEditData',
      data: JSON.parse(JSON.stringify({
        stroke: edge.attrs.line.stroke,
        strokeWidth: edge.attrs.line.strokeWidth
      }))
    })
  }
  function setCurEditData(node) {
    let nodeAttrs = node.getAttrs()
    let nodeSize = node.getSize()
    store.commit({
      type: 'editor/setCurEditData',
      data: JSON.parse(JSON.stringify({
        textVal: nodeAttrs.text.textWrap.text,
        w: nodeSize.width,
        h: nodeSize.height,
        zIndex: node.zIndex,
        fill: nodeAttrs.body.fill,
        stroke: nodeAttrs.body.stroke,
        strokeWidth: nodeAttrs.body.strokeWidth,
        textFill: nodeAttrs.text.fill,
        fontSize: nodeAttrs.text.fontSize
      }))
    })
  }
  graph.on("node:click", ({ node, e }) => {
    window.n = node
    store.commit('editor/setAsideDrawerObj', { status: true, type: 'attr' })
    store.commit('editor/setCanvasTarget', node)
    setCurEditData(node)
    setTimeout(() => {
      proxy.$EventBus.emit("click-canvas-target", node);
    }, 0);

  });
  graph.on("node:added", ({ node, e }) => {
    store.commit('editor/setAsideDrawerObj', { status: true, type: 'attr' })
    store.commit('editor/setCanvasTarget', node)
    setCurEditData(node)
    setTimeout(() => {
      proxy.$EventBus.emit("click-canvas-target", node);
    }, 0);

  });
  graph.on("node:resizing", ({ node }) => {
    setCurEditData(node)
    store.commit('editor/setCanvasTarget', node)
    setTimeout(() => {
      proxy.$EventBus.emit("click-canvas-target", node);
    }, 0);
  });
  graph.on('edge:click', ({ edge }) => {
    store.commit('editor/setAsideDrawerObj', { status: true, type: 'edge' })
    store.commit('editor/setCanvasTarget', edge)
    setCurEditData2(edge)
    setTimeout(() => {
      proxy.$EventBus.emit("click-canvas-target", edge);
    }, 0);
  })
  graph.on("blank:click", () => {
    store.commit('editor/setAsideDrawerObj', { status: false, type: null })
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
  height: calc(100vh - 60px);
}
.mini-map-container {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 20px;
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