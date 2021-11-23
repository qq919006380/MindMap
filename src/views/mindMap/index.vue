<template>
  <el-container>
    <el-header height="25px">
      <Header></Header>
    </el-header>
    <el-container>
      <el-main style="padding:0">
        <Canvas></Canvas>
      </el-main>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import Canvas from "./canvas";
import Header from "./header";
import Aside from "./aside";

export default defineComponent({
  setup() { },
  components: { Canvas, Header, Aside },
});
</script>
