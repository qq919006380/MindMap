<template>
  <Header></Header>
  <div class="container">
    <div class="aside">
      <stencil></stencil>
    </div>
    <div class="content">
      <Canvas></Canvas>
    </div>
  </div>

  <el-drawer
    :append-to-body="true"
    :lock-scroll="false"
    modal-class="el-drawer-modal-class"
    :open-delay="0"
    :close-delay="0"
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

</template>
<script setup>
import Canvas from "./canvas";
import Header from "./header";
import stencil from "./aside/stencil.vue"
import "@antv/x6-vue-shape";
import Aside from "./aside/index.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore()
const status = computed({
  set(value) {
    setAsideDrawerObj(value)
  },
  get() {
    return store.state.editor.asideDrawerObj.status

  }
})
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
  inset: 0px 0px 0px calc(100vw - 300px) !important;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #b3d8ff;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
<style scoped  lang="scss">
.container {
  display: flex;
  .aside {
    width: 200px;
  }
  .content {
    width: calc(100% - 200px);
  }
}

.el-container {
  height: calc(100vh - 60px);
}
.el-main {
  padding: 0;
}
 
</style>