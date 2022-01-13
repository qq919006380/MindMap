<template>
  <div class="header-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <a href="https://github.com/qq919006380/MindMap">github</a>
      </el-col>
      <el-col :span="16">
        <div class="btn-wrap">
          <el-button type="primary">
            快捷键
            <el-icon :size="18">
              <Grid />
            </el-icon>
          </el-button>

          <el-button type="primary">
            导出图片
            <el-icon :size="18">
              <Upload />
            </el-icon>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup  >
import { Grid, Upload } from '@element-plus/icons-vue'
</script>

<style scoped>
.header-container {
  margin: 5px;
}
.btn-wrap {
  text-align: right;
}
</style>