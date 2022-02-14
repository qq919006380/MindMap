<template>
  <div class="header-container">
    <el-row :gutter="20">
      <el-col :span="8" class="menu-left">
        <span @click="goHome">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-home" />
          </svg>
          <span class="text">首页</span>
        </span>

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

        <span @click="downloadImg">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daochu" />
          </svg>
          <span class="text">导出图片</span>
        </span>

        <span @click="save">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-baocun1" />
          </svg>
          <span class="text">保存</span>
        </span>

        <span @click="clear">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-baocun1" />
          </svg>
          <span class="text">清空</span>
        </span>
      </el-col>
    </el-row>
  </div>
  <!-- 弹窗 -->
  <ShortcutKeyDialog v-model="shortcutKeyShow"></ShortcutKeyDialog>
</template>

<script setup  >
import { ElMessage, ElMessageBox } from 'element-plus'

import ShortcutKeyDialog from '../../components/ShortcutKeyDialog.vue'
import { ref } from 'vue'
import { DataUri } from '@antv/x6'
import BaseGraph from "./baseGraph";
import { useRouter } from 'vue-router'


var obj = JSON.parse(localStorage.getItem('graphCacheData') || '{"nodes":[],"edges":[]}')
if (obj && (obj.edges.length > 0 || obj.nodes.length > 0)) {
  ElMessageBox.confirm(
    '检测到有本地缓存数据，是否显示？',
    'Warning',
    {
      confirmButtonText: '显示',
      cancelButtonText: '清除',
      type: 'warning',
    }
  )
    .then(() => {
      let graphCacheData = JSON.parse(localStorage.getItem('graphCacheData'))
      BaseGraph.graph.fromJSON(graphCacheData)
    })
    .catch(() => {
      BaseGraph.graph.fromJSON({})
    })
}

function clear() {
  ElMessageBox.confirm(
    '是否确定清空当前画布和本地缓存的所有内容?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      BaseGraph.graph.fromJSON({})
      localStorage.setItem('graphCacheData', null)
    })


}
function save() {
  localStorage.setItem('graphCacheData', JSON.stringify(BaseGraph.getGraphData()))
  ElMessage({
    message: '保存成功，数据将缓存在浏览器本地！',
    type: 'success',
  })

}


/**
   * 修改画布颜色
   * @param {*} getColor 
   */
function handleColorChange(getColor) {
  graph.drawBackground({ color: getColor });
}

const router = useRouter()

function goHome() {
  router.push({
    name: 'Home'
  })
}
function openGithub() {
  window.open('https://github.com/qq919006380/MindMap')
}
let shortcutKeyShow = ref(false)


let downloadImg = () => {
  let graph = BaseGraph.graph
  graph.toPNG((dataUri) => {
    // 下载
    DataUri.downloadDataUri(dataUri, 'chart.png')
  }, {
    padding: {
      top: 20,
      right: 30,
      bottom: 40,
      left: 50,
    },
  })
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
.menu-right .text {
  color: #666;
}
.menu-left .text {
  color: #333;
}
.header-container {
  margin: 5px;
}
.btn-wrap {
  text-align: right;
}
</style>