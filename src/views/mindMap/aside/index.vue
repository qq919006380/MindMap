<template>
  <div class="aside-template">
    <el-tabs v-model="activeName">
      <el-tab-pane label="模型" name="model">
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
import { Addon, Graph } from "@antv/x6";
import attr from "./attr.vue";
let activeName = ref("model");
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("aside-tabs-activeName", (name) => {
  activeName.value = name;
});

let graph;
let disabled = ref(false)


onMounted(() => {
  graph = BaseGraph.graph;
  const stencil = new Addon.Stencil({
    title: '组件',
    target: graph,
    // search(cell, keyword) {
    //   return cell.shape.indexOf(keyword) !== -1
    // },
    placeholder: '搜索组件名称',
    notFoundText: 'Not Found',
    stencilGraphWidth: 200,//模板画布宽度。
    stencilGraphHeight: 480,//模板画布高度。
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
  let { rectNodeComponent, ellipseNodeComponent, heartNodeComponent, MusicNodeComponent, starNodeComponent, polygonNodeComponent } = BaseGraph.getCompontent()
  document.getElementById('stencil').appendChild(stencil.container)
  stencil.load([rectNodeComponent, ellipseNodeComponent, polygonNodeComponent, heartNodeComponent, starNodeComponent], 'group1')
  stencil.load([MusicNodeComponent], 'group2')
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