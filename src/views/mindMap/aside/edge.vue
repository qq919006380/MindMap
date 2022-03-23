<template>
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
</template>
<script setup>
import { getCurrentInstance, reactive, ref, computed } from "vue";
import { useStore } from 'vuex'

const store = useStore()
const divRef = ref()
const selectNode = computed(() => store.state.editor.canvasTarget)
// 渲染form-item List
let attrsMap = reactive({
    textVal: { key: 'textVal', name: '内容', type: 'TextArea' },
    textFill: { key: 'textFill', name: '文字颜色', type: "Color" },
    fontSize: { key: 'fontSize', name: '文字大小', type: "Slider", min: 0, max: 36 },

    stroke: { key: 'stroke', name: '线颜色', type: "Color" },
    strokeWidth: { key: 'strokeWidth', name: '线粗细', type: "Slider" },
})
let attrsList = computed(() => {
    let shapeAttrMap = {
        edge: ['textVal', 'textFill', 'fontSize', 'stroke', 'strokeWidth'],
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
/**
 * 节点回显值
 */
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("click-canvas-target", () => {
    Object.assign(editData.value, curEditData.value)
});

/**
 * 节点设置值
 */
function notifyChange() {
    selectNode.value.setLabels([{
        attrs: {
            text: {
                fontSize: editData.value.fontSize,
                fill: editData.value.textFill,
                text: editData.value.textVal,
            },
        }

    }])
    selectNode.value.setAttrs({
        line: {
            strokeWidth: editData.value.strokeWidth,
            stroke: editData.value.stroke,
        }
    })

    store.commit({
        type: 'editor/setCurEditData',
        data: JSON.parse(JSON.stringify(editData.value))
    })
}
</script>