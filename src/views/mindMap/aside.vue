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
            width: 200,
            height: 80,
            attrs: {
              body: {
                fill: "#fff", // 背景颜色
                stroke: "#000", // 边框颜色
              },
              //   text: {
              //     textWrap: {
              //       text: "使用 textWrap 实现文本换行",
              //       width: -10, // 宽度减少 10px
              //     },
              //   },
              label: {
                text: "ssss", // 文本
                fill: "#333", // 文字颜色
                fontSize: 24, // 文字大小
              },
            },
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
            ports,
            component: "end-node-component",
          });
          break;
        case "taskNode":
          node = graph.createNode({
            type: "taskNode",
            shape: "vue-shape",
            x: 300,
            y: 300,
            width: 300,
            height: 121,
            ports,
            data: {
              name: "任务节点",
              desc: "节点内容",
            },
            component: "task-node-component",
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