<template>
  <div>
    <el-form label-position="right" label-width="70px" size="small">
      <div v-for="item in attrsList" :index="item.key">
        <el-form-item :label="item.name" v-if="'TextArea' == item.type">
          <el-input
            ref="divRef"
            v-model="editData[item.key]"
            :rows="2"
            @input="notifyChange"
            type="textarea"
          />
        </el-form-item>

        <el-form-item :label="item.name" v-if="'Number' == item.type">
          <el-input-number
            :min="0"
            :max="800"
            controls-position="right"
            v-model.number="editData[item.key]"
            @change="notifyChange"
          />
        </el-form-item>

        <el-form-item :label="item.name" v-if="'Color' == item.type">
          <el-color-picker
            color-format="rgb"
            v-model="editData[item.key]"
            :predefine="predefineColors"
            @change="notifyChange"
          />
        </el-form-item>
        <el-form-item :label="item.name" v-if="'Slider' == item.type">
          <el-slider
            input-size="small"
            @input="notifyChange"
            :min="item.min ? item.min : 0"
            :max="item.max ? item.max : 10"
            v-model="editData[item.key]"
          ></el-slider>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, computed } from "vue";
import { useStore } from 'vuex'
const store = useStore()
const divRef = ref()
const selectNode = computed(() => store.state.editor.canvasTarget)

// 渲染form-item List
let attrsMap = {
  textVal: { key: 'textVal', name: '内容', type: 'TextArea' },
  textFill: { key: 'textFill', name: '文字颜色', type: "Color" },
  fontSize: { key: 'fontSize', name: '文字大小', type: "Slider", min: 0, max: 36 },
  w: { key: 'w', name: '宽', type: 'Number', col: 12 },
  h: { key: 'h', name: '高', type: 'Number', col: 12 },
  zIndex: { key: 'zIndex', name: '层叠权重', type: 'Number' },
  fill: { key: 'fill', name: '填充颜色', type: "Color" },
  stroke: { key: 'stroke', name: '边框颜色', type: "Color" },
  strokeWidth: { key: 'strokeWidth', name: '边框粗细', type: "Slider" },
  textFill: { key: 'textFill', name: '文字颜色', type: "Color" },
  fontSize: { key: 'fontSize', name: '文字大小', type: "Slider", min: 0, max: 36 },
}

let attrsList = computed(() => {
  let shapeAttrMap = {
    rect: ['textVal', 'textFill', 'fontSize', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth'],
    shape: ['textVal', 'textFill', 'fontSize', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth'],
    ellipse: ['textVal', 'textFill', 'fontSize', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth'],
    polygon: ['textVal', 'textFill', 'fontSize', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth'],
    path: ['textVal', 'textFill', 'fontSize', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth']
  }
  let curKey = shapeAttrMap[selectNode.value.shape] || []
  let arr = []
  curKey.forEach(key => {
    arr.push(attrsMap[key])
  })
  return arr
})
let editData = ref({})
const curEditData = computed(() => store.state.editor.curEditData)

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
])
const { proxy } = getCurrentInstance();
/**
 * 节点回显值
 */
proxy.$EventBus.on("click-canvas-target", () => {
  Object.assign(editData.value, curEditData.value)
});

/**
 * 节点设置值
 */
function notifyChange() {
  selectNode.value.attr({
    body: {
      stroke: editData.value.stroke,
      fill: editData.value.fill,
      strokeWidth: editData.value.strokeWidth
    },
    text: {
      fill: editData.value.textFill,
      fontSize: editData.value.fontSize,
      textWrap: {
        text: editData.value.textVal,
      }
    }
  })
  selectNode.value.setSize(editData.value.w, editData.value.h)
  selectNode.value.zIndex = editData.value.zIndex

  store.commit({
    type: 'editor/setCurEditData',
    data: JSON.parse(JSON.stringify(editData.value))
  })
}

</script>

<style scoped>
</style>