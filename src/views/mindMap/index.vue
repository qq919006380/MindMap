<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <stencil></stencil>
      </el-aside>
      <el-main>
        <Canvas></Canvas>
      </el-main>
    </el-container>
  </el-container>

  <el-drawer
    modal-class="el-drawer-modal-class"
    :size="300"
    :modal="false"
    :close-on-click-modal="false"
    v-model="attrDrawer"
    title="节点属性"
    direction="rtl"
  >
    <Aside></Aside>
  </el-drawer>

  <el-icon class="icon-left" @click="attrDrawer = true">
    <d-arrow-left />
  </el-icon>
  <el-icon class="icon-right" @click="stencilDrawer = true">
    <d-arrow-right />
  </el-icon>
</template>
<script setup>
import Canvas from "./canvas";
import Header from "./header";
import stencil from "./aside/stencil.vue"

import Aside from "./aside/index.vue";
import { ref } from "vue";

let attrDrawer = ref(false)
let stencilDrawer = ref(true)
</script>
<style>
.el-drawer-modal-class {
  position: unset !important;
}
</style>
<style scoped  lang="scss">
.icon-left,
.icon-right {
  width: 25px;
  border: 1px solid #999;
  padding: 12px 0;
  color: #999;
  position: fixed;
  bottom: 50%;
  cursor: pointer;
}
.icon-left:hover,
.icon-right:hover {
  color: #409eff;
}
.icon-left {
  right: 0;
  border-radius: 50px 0px 0px 50px;
  border-right: none;
}
.icon-right {
  left: 0;
  border-radius: 0% 50px 50px 0%;
  border-left: none;
}
</style>