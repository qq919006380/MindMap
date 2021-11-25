<template>
  <dl @mousedown="startDragToGraph('rect', $event)">
    <dd>矩形</dd>
  </dl>
  <dl @mousedown="startDragToGraph('circle', $event)">
    <dd>圆形</dd>
  </dl>
  <dl @mousedown="startDragToGraph('cylinder', $event)">
    <dd>圆柱</dd>
  </dl>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import BaseGraph from "./baseGraph"; //  GraphData, GraphOptions
import { Addon, Graph } from "@antv/x6";
import rectNode from "../../components/mindMap/RectNode.vue";

export default {
  setup() {
    // 注册 vue 组件
    Graph.registerVueComponent(
      "rect-node-component",
      {
        template: `<rect-node></rect-node>`,
        components: { rectNode },
      },
      true
    );
    let common = {
      body: {
        fill: "#fff", // 背景颜色
        stroke: "#000", // 边框颜色
        ref: "text",
        refWidth: 100,
        refHeight: 60,
        refX: -8,
        refY: -8,
      },
      label: {
        fill: "#333", // 文字颜色
        fontSize: 16, // 文字大小
      },
    };
    let graph;
    let startDragToGraph = (type, e) => {
      let node = null;
      switch (type) {
        case "rect":
          node = graph.createNode({
            type: "rect",
            shape: "vue-shape",
            x: 300,
            y: 300,
            attrs: common,
            component: "rect-node-component",
          });
          break;
        case "circle":
          node = graph.createNode({
            shape: "vue-shape",
            x: 300,
            y: 300,
            width: 60,
            height: 60,
            component: "circle-node-component",
          });
          break;
        case "cylinder":
          node = graph.createNode({
            type: "cylinder",
            shape: "vue-shape",
            x: 300,
            y: 300,
            width: 300,
            height: 121,
            component: "cylinder-node-component",
          });
          break;
      }

      const dnd = new Addon.Dnd({ target: graph });
      dnd.start(node, e);
    };
    onMounted(() => {
      graph = BaseGraph.graph;
    });
    return { startDragToGraph };
  },
};
</script>

<style>
</style>