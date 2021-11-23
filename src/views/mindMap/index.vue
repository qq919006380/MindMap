<template>
  <el-container>
    <el-header height="25px">
      <Header></Header>
    </el-header>
    <el-container>
      <el-container>
        <el-main>
          <Canvas></Canvas>
        </el-main>
      </el-container>
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
  setup() {},
  components: { Canvas, Header, Aside },
});
</script>
