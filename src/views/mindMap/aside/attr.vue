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
        <el-input-number
          :min="80"
          :max="800"
          controls-position="right"
          v-model.number="sizeMap.width"
          @change="notifyChange"
        />
      </el-form-item>
      <el-form-item label="高">
        <el-input-number
          :min="60"
          :max="600"
          controls-position="right"
          v-model.number="sizeMap.height"
          @change="notifyChange"
        />
      </el-form-item>
      <el-form-item label="层叠权重">
        <el-input-number
          :min="0"
          :max="999"
          controls-position="right"
          v-model.number="sizeMap.zIndex"
          @change="notifyChange"
        />
      </el-form-item>
       

      <el-form-item label="填充颜色">
        <el-color-picker
          color-format="rgb"
          v-model="attrsMap.body.fill"
          :predefine="predefineColors"
          @change="notifyChange"
        />
      </el-form-item>
      <el-form-item label="边框颜色">
        <el-color-picker
          color-format="rgb"
          v-model="attrsMap.body.stroke"
          :predefine="predefineColors"
          @change="notifyChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from "vue";
const divRef = ref()
let selectNode = null
let attrsMap = reactive({
  body: {
    stroke: "",
    fill: "",
  },
})
let dataMap = reactive({
  text: ""
})
let sizeMap = reactive({
  width: 0,
  height: 0,
  zIndex: 0
})

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
])
/**
 * 回显值
 */
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("canvas-select-node", (node) => {
  selectNode = node
  window.n = node
  Object.assign(attrsMap, selectNode.getAttrs())//回显属性
  Object.assign(dataMap, selectNode.getData())//回显数据
  Object.assign(sizeMap, selectNode.getSize())//回显尺寸
  sizeMap.zIndex = selectNode.zIndex
  divRef.value.focus()
  console.log(attrsMap)
});
/**
 * 设置值
 */
function notifyChange() {
  console.log(attrsMap)
  selectNode.attr(attrsMap)
  selectNode.setData(dataMap)
  selectNode.setSize(sizeMap.width, sizeMap.height)
  selectNode.zIndex = sizeMap.zIndex
}
</script>

<style>
</style>