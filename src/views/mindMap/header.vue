<template>
  <div class="header-container">
    <el-row :gutter="20">
      <el-col :span="8" class="menu-left">
        <span @click="openGithub">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-github-fill" />
          </svg>
          <span class="text">star</span>
        </span>
      </el-col>
      <el-col :span="16" class="menu-right">
        <span @click="shortcutKeyShow = !shortcutKeyShow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kuaijiejianshezhi" />
          </svg>
          <span class="text">快捷键</span>
        </span>

        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daochu" />
          </svg>
          <span class="text">导出图片</span>
        </span>

        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-baocun1" />
          </svg>
          <span class="text">保存</span>
        </span>
      </el-col>
    </el-row>
  </div>

  <!-- 弹窗 -->
  <ShortcutKeyDialog v-model="shortcutKeyShow"></ShortcutKeyDialog>
</template>

<script setup  >
import ShortcutKeyDialog from '../../components/ShortcutKeyDialog.vue'
import { ref } from 'vue'

function openGithub() {
  window.open('https://github.com/qq919006380/MindMap')
}
let shortcutKeyShow = ref(false)
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
.menu-left,
.menu-right {
  & > span {
    display: inline-block;
    margin-right: 10px;
    .icon,
    .text {
      vertical-align: middle;
    }
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