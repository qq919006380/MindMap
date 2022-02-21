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
            :min="0"
            :max="10"
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
let selectNode = ref({})
// 渲染form-item List
let attrsMap = reactive({
  textVal: { key: 'textVal', name: '内容', type: 'TextArea' },
  w: { key: 'w', name: '宽', type: 'Number', col: 12 },
  h: { key: 'h', name: '高', type: 'Number', col: 12 },
  zIndex: { key: 'zIndex', name: '层叠权重', type: 'Number' },
  fill: { key: 'fill', name: '填充颜色', type: "Color" },
  stroke: { key: 'stroke', name: '边框颜色', type: "Color" },
  strokeWidth: { key: 'strokeWidth', name: '边框粗细', type: "Slider" },
})
let shapeAttrMap = {
  rect: ['textVal', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth'],
  shape: ['textVal', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth'],
  ellipse: ['textVal', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth'],
  polygon: ['textVal', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth'],
  path: ['textVal', 'w', 'h', 'zIndex', 'fill', 'stroke', 'strokeWidth']
}
let attrsList = computed(() => {
  let curKey = shapeAttrMap[selectNode.value.shape] || []
  let arr = []
  curKey.forEach(key => {
    arr.push(attrsMap[key])
  })
  return arr
})
let editData = ref({})
const { curEditData } = { ...store.state.editor }

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
 * 节点回显值
 */
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("canvas-select-node", (node) => {
  selectNode.value = node
  let nodeAttrs = selectNode.value.getAttrs()
  let nodeSize = selectNode.value.getSize()
  store.commit({
    type: 'editor/setCurEditData',
    data: JSON.parse(JSON.stringify({
      textVal: nodeAttrs.text.textWrap.text,
      w: nodeSize.width,
      h: nodeSize.height,
      zIndex: selectNode.value.zIndex,
      fill: nodeAttrs.body.fill,
      stroke: nodeAttrs.body.stroke,
      strokeWidth: nodeAttrs.body.strokeWidth,
    }))
  })
  Object.assign(editData.value, curEditData)
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