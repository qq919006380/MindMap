<template>
    <el-dialog  :modal="false" v-model="dialogVisible" title="快捷键" width="400px">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="func" label="功能" />
            <el-table-column prop="shortcut" label="快捷键" />
        </el-table>
    </el-dialog>
</template>
<script setup="props, context">
import { defineEmits, defineProps, watch, toRefs, ref } from 'vue'
const props = defineProps({
    modelValue: Boolean
});
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
let dialogVisible = ref(modelValue.value)

let tableData = ref([
    { func: "复制", shortcut: "ctrl+c" },
    { func: "黏贴", shortcut: "ctrl+v" },
    { func: "保存", shortcut: "ctrl+s" },
    { func: "清除", shortcut: "ctrl+d" },
    { func: "放大缩小", shortcut: "按住ctrl+鼠标滚轮" }
])


watch(modelValue, () => {
    dialogVisible.value = modelValue.value
})
watch(dialogVisible, () => {
    emit('update:modelValue', dialogVisible.value)
})
</script>
<style   scoped>
</style>
