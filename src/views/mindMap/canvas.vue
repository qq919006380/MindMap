<template>
  <div>
    <div class="mini-map-container" ref="miniMapContainerRef"></div>
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import BaseGraph from "./baseGraph"; //  GraphData, GraphOptions

export default {
  setup() {
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
      // 双击进入编辑模式
      graph.on("node:dblclick", ({ cell, e }) => {
        cell.addTools({
          name: "node-editor",
          args: {
            attrs: {
              fontSize: "24",
            },
          },
          
        });
      });
    });

    return { containerRef, miniMapContainerRef };
  },
};
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
</style>