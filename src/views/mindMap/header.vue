<template>
  <div class="header-container">
    <el-row :gutter="20">
      <el-col :span="8" class="menu-left">
        <span @click="openGithub">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-github-fill" />
          </svg>
          <span>star</span>
        </span>
      </el-col>
      <el-col :span="16" class="menu-right">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kuaijiejianshezhi" />
          </svg>
          快捷键
        </span>

        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daochu" />
          </svg>
          导出图片
        </span>

        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-baocun1" />
          </svg>
          保存
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup  >


function openGithub() {
  window.open('https://github.com/qq919006380/MindMap')
}
</script>

<style scoped  lang="scss">
.icon {
  margin: 0 5px;
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: #333;
  overflow: hidden;
}

.menu-right {
  text-align: right;
}
.menu-left {
  & > span > * {
    vertical-align: middle;
  }
  &:hover {
    cursor: pointer;
  }
}

.header-container {
  margin: 5px;
}
.btn-wrap {
  text-align: right;
}
</style>