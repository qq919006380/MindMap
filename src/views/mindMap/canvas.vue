<template>
  <div>
    <div class="mini-map-container" ref="miniMapContainerRef"></div>
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import "@antv/x6-vue-shape";
import { Graph, Shape } from "@antv/x6";
import { ref, onMounted } from "vue";
import BaseGraph from './baseGraph' //  GraphData, GraphOptions


export default defineComponent({
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

      })
      console.log('ca', graph)
    });

    return { containerRef, miniMapContainerRef };
  },
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
</style>