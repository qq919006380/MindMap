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

export default defineComponent({
  setup() {
    const containerRef = ref(null);
    const miniMapContainerRef = ref(null);
    onMounted(() => {
      new Graph({
        height:700,
        container: containerRef.value, // 画布的容器
        selecting: true,
        snapline: true, // 对齐线
        history: true, // 启动历史记录
        background: {
          color: "#ffffff",
        },
        // 网格
        grid: {
          size: 10,
          visible: true,
          type: "doubleMesh",
          args: [
            {
              color: "#E7E8EA",
              thickness: 1,
            },
            {
              color: "#CBCED3",
              thickness: 1,
              factor: 5,
            },
          ],
        },
        // Scroller 使画布具备滚动、平移、居中、缩放等能力
        scroller: {
          enabled: true,
          pageVisible: true,
          pageBreak: true,
          pannable: true,
        },
        // Scroller 后可开启小地图
        minimap: {
          enabled: true,
          container: miniMapContainerRef.value,
        },
        // 鼠标滚轮的默认行为是滚动页面
        mousewheel: {
          enabled: true,
          modifiers: ["ctrl", "meta"],
          minScale: 0.5,
          maxScale: 2,
        },
        // 节点连接
        connecting: {
          anchor: "center",
          connectionPoint: "anchor",
          snap: true, // 自动吸附
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: "#1890ff",
                  strokeWidth: 1,
                  targetMarker: {
                    name: "classic",
                    size: 8,
                  },
                  strokeDasharray: 0, //虚线
                  style: {
                    animation: "ant-line 30s infinite linear",
                  },
                },
              },
              label: {
                text: "",
              },
              connector: "normal",
              router: {
                name: "manhattan",
              },
              zIndex: 0,
            });
          },
        },
        // 高亮
        highlighting: {
          magnetAvailable: {
            name: "stroke",
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 4,
                stroke: "#6a6c8a",
              },
            },
          },
        },
      });
    });

    return { containerRef, miniMapContainerRef };
  },
});
</script>


<style>
.mini-map-container {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 240px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}
</style>