<template>
  <div>
    <el-form label-position="right" label-width="70px" size="mini">
      <el-form-item label="文本">
        <el-input
          ref="divRef"
          v-model="dataMap.text"
          :rows="2"
          placeholder="Please input"
          @input="notifyChange"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="宽">
        <el-input v-model.number="sizeMap.width" @input="notifyChange" />
      </el-form-item>
      <el-form-item label="高">
        <el-input v-model.number="sizeMap.height" @input="notifyChange" />
      </el-form-item>
      <el-form-item label="层叠权重">
        <el-input v-model.number="sizeMap.zIndex" @input="notifyChange" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, onMounted } from "vue";
const divRef = ref()
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
  height: 0,
  zIndex: 0
})

/**
 * 回显值
 */
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("canvas-select-node", (node) => {
  selectNode = node
  window.n = node
  Object.assign(attrsMap, selectNode.getAttrs())
  Object.assign(dataMap, selectNode.getData())
  Object.assign(sizeMap, selectNode.getSize())
  sizeMap.zIndex = selectNode.zIndex

  divRef.value.focus()
});
/**
 * 设置值
 */
function notifyChange() {
  selectNode.attr(attrsMap)
  selectNode.setData(dataMap)
  selectNode.setSize(sizeMap.width, sizeMap.height)
  selectNode.zIndex = sizeMap.zIndex
}
</script>

<style>
</style>