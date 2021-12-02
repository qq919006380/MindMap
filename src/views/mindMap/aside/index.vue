<template>
  <div class="aside-template">
    <el-tabs v-model="activeName">
      <el-tab-pane label="模型" name="model">
        <!-- <dl @mousedown="startDragToGraph('rect', $event)">
          <dd>矩形</dd>
        </dl>
        <dl @mousedown="startDragToGraph('circle', $event)">
          <dd>圆形</dd>
        </dl>
        <dl @mousedown="startDragToGraph('cylinder', $event)">
          <dd>圆柱</dd>
        </dl>-->
        <div id="stencil"></div>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr" :disabled="disabled">
        <attr></attr>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import BaseGraph from "../baseGraph";
import ports from "../ports"
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
let disabled = ref(false)



// let startDragToGraph = (type, e) => {
//   let node = null;
//   switch (type) {
//     case "rect":
//       node = rectNodeComponent
//       break;
//     case "circle":
//       node = circleNodeComponent
//       break;
//   }
//   const dnd = new Addon.Dnd({ target: graph });
//   dnd.start(node, e);
// };
onMounted(() => {
  graph = BaseGraph.graph;
  let rectNodeComponent = graph.createNode({
    type: "rect",
    shape: "vue-shape",
    width: 140,
    height: 60,
    ports,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
    },
    data: {
      text: ""
    },
    component: "rect-node-component",
  });
  let circleNodeComponent = graph.createNode({
    shape: "vue-shape",
    width: 60,
    height: 60,
    ports,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
    },
    data: {
      text: ""
    },
    component: "rect-node-component",
  });

  // #region 初始化 stencil
  const stencil = new Addon.Stencil({
    title: '组件',
    target: graph,
    search(cell, keyword) {
      return cell.shape.indexOf(keyword) !== -1
    },
    placeholder: '搜索组件名称',
    notFoundText: 'Not Found',
    stencilGraphWidth: 200,//模板画布宽度。
    stencilGraphHeight: 180,//模板画布高度。
    stencilGraphPadding: 0,
    collapsable: true,
    groups: [
      {
        title: '基础组件',
        name: 'group1',
      },
      {
        title: '特殊组件',
        name: 'group2',
      },
    ],
    layoutOptions: {
      columns: 1,//网格布局的列数，默认为 2。行数根据节点数自动计算。
      marginX: 50,
      marginY: 10,

    },
  })

  document.getElementById('stencil').appendChild(stencil.container)
  stencil.load([rectNodeComponent, circleNodeComponent], 'group1')
});
</script>

<style scoped>
#stencil {
  width: 100%;
  height: calc(100vh - 100px);
}
.aside-template {
  padding: 0 0 0 15px;
}
</style>