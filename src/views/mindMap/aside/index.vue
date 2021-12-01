<template>
  <div class="aside-template">
    <el-tabs v-model="activeName">
      <el-tab-pane label="模型" name="model">
        <dl @mousedown="startDragToGraph('rect', $event)">
          <dd>矩形</dd>
        </dl>
        <dl @mousedown="startDragToGraph('circle', $event)">
          <dd>圆形</dd>
        </dl>
        <dl @mousedown="startDragToGraph('cylinder', $event)">
          <dd>圆柱</dd>
        </dl>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr">
        <attr></attr>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import BaseGraph from "../baseGraph"; //  GraphData, GraphOptions
import { Addon, Graph } from "@antv/x6";
import rectNode from "../../../components/mindMap/RectNode.vue";
import attr from "./attr.vue";

let activeName = ref("model");
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("aside-tabs-activeName", (name) => {
  activeName.value = name;
});
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
        height: 120,
        zIndex:1,
        attrs: {
          body: {
            fill: "#fff", // 背景颜色
            stroke: "#000", // 边框颜色
          },
        },
        data: {
          text: ""
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
</script>

<style scoped>
.aside-template {
  padding: 0 20px;
}
</style>