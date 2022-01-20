<template>
  <div>
    <el-form label-position="right" label-width="70px" size="small">
      <el-form-item label="文本">
        <el-input
          ref="divRef"
          v-model="attrsMap.text.textWrap.text"
          :rows="2"
          placeholder="Please input"
          @input="notifyChange"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="宽">
        <el-input-number
          :min="sizeMap.width"
          :max="800"
          controls-position="right"
          v-model.number="sizeMap.width"
          @change="notifyChange"
        />
      </el-form-item>
      <el-form-item label="高">
        <el-input-number
          :min="sizeMap.height"
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
      <el-form-item label="边框粗细">
        <el-slider
          input-size="small"
          @input="notifyChange"
          :min="0"
          :max="10"
          v-model="attrsMap.body.strokeWidth"
        ></el-slider>
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
    stroke: null,
    fill: null,
    strokeWidth: null
  },
  text: {
    textWrap: {
      text: "",
      width: -10
    }
  }

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
  Object.assign(sizeMap, selectNode.getSize())//回显尺寸
  sizeMap.zIndex = selectNode.zIndex
  // divRef.value.focus()
  notifyChange()
});
/**
 * 设置值
 */
function notifyChange() {
  selectNode.attr(attrsMap)
  selectNode.setSize(sizeMap.width, sizeMap.height)
  selectNode.zIndex = sizeMap.zIndex

}
</script>

<style scoped>
</style>