<template>
  <div>
    <el-form label-position="right" label-width="60px" size="mini">
      <el-form-item label="文本">
        <el-input
          v-model="dataMap.text"
          :rows="2"
          placeholder="Please input"
          @input="notifyChange"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="宽">
        <el-input size="mini" v-model.number="sizeMap.width" @input="notifyChange" />
      </el-form-item>
      <el-form-item label="高">
        <el-input size="mini" v-model.number="sizeMap.height" @input="notifyChange" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue";
let selectNode = null
let attrsMap = reactive({
  body: {},
  label: {
    text: ""
  }
})
let dataMap = reactive({
  text: ""
})
let sizeMap = reactive({
  width: 0,
  height: 0
})



const { proxy } = getCurrentInstance();
proxy.$EventBus.on("canvas-select-node", (node) => {
  selectNode = node
  Object.assign(attrsMap, selectNode.getAttrs())
  Object.assign(dataMap, selectNode.getData())
  Object.assign(sizeMap, selectNode.getSize())
});
function notifyChange() {
  selectNode.attr(attrsMap)
  selectNode.setData(dataMap)
  selectNode.setSize(sizeMap.width, sizeMap.height)
}
</script>

<style>
</style>