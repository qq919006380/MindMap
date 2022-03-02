<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <stencil></stencil>
      </el-aside>
      <el-main class="el-main">
        <Canvas></Canvas>
      </el-main>
    </el-container>
  </el-container>

  <el-drawer
    modal-class="el-drawer-modal-class"
    :size="300"
    :modal="false"
    :close-on-click-modal="false"
    :before-close="() => { setAsideDrawerObj(false) }"
    v-model="status"
    :title="type == 'attr' ? '节点属性' : '线属性'"
    direction="rtl"
  >
    <Aside></Aside>
  </el-drawer>

  <el-icon class="icon-left" @click="setAsideDrawerObj(true)">
    {{ status }}
    <d-arrow-left />
  </el-icon>
</template>
<script setup>
import Canvas from "./canvas";
import Header from "./header";
import stencil from "./aside/stencil.vue"

import Aside from "./aside/index.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore()
const status = computed(() => store.state.editor.asideDrawerObj.status)
const type = computed(() => store.state.editor.asideDrawerObj.type)

function setAsideDrawerObj(val) {
  store.commit('editor/setAsideDrawerObj', {
    type: 'attr',
    status: val
  })
}


</script>
<style>
.el-drawer-modal-class {
  position: unset !important;
}
</style>
<style scoped  lang="scss">
.el-main {
  padding: 0;
}
.icon-left {
  width: 25px;
  border: 1px solid #999;
  padding: 12px 0;
  color: #999;
  position: fixed;
  bottom: 50%;
  cursor: pointer;
}
.icon-left:hover {
  color: #409eff;
}
.icon-left {
  right: 0;
  border-radius: 50px 0px 0px 50px;
  border-right: none;
}
</style>