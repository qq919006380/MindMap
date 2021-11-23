<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-container>
        <el-main>
          <Canvas></Canvas>
        </el-main>
      </el-container>
      <el-aside width="200px">Aside</el-aside>
    </el-container>
  </el-container>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import Canvas from "./canvas";

export default defineComponent({
  setup() {},
  components: { Canvas },
});
</script>
