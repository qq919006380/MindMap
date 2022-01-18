<template>
    <el-dialog v-model="dialogVisible" title="快捷键" width="30%">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="func" label="功能" />
            <el-table-column prop="shortcut" label="快捷键" />
        </el-table>
    </el-dialog>
</template>
<script    setup="props, context">
import { defineEmits, defineProps, watch, toRefs, ref } from 'vue'
const props = defineProps({
    modelValue: Boolean
});
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
let dialogVisible = ref(modelValue.value)

let tableData = ref([
    { func: "切换右边栏", shortcut: 'Tab' },
    { func: "复制", shortcut: "ctrl+c" },
    { func: "黏贴", shortcut: "ctrl+v" }
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
