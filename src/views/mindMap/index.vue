<template>
  <Header></Header>
  <el-container>
    <el-container>
      <el-main style="padding:0;">
        <Canvas></Canvas>
      </el-main>
      <el-aside>
        <Aside></Aside>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import Canvas from "./canvas";
import Header from "./header";
import Aside from "./aside/index.vue";

export default {
  setup() { },
  components: { Canvas, Header, Aside },
};
</script>
