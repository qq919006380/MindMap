<template>
    <el-dialog v-model="dialogVisible" title="设置" width="400px">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="全局配置" name="globalConfig">
                <el-form ref="formRef"   label-width="120px">
                    <el-form-item label="网格类型">
                        <el-select v-model="state.type" @change="handleConfigChange">
                            <el-option label="点状网格" value="dot"></el-option>
                            <el-option label="固定点状网格" value="fixedDot"></el-option>
                            <el-option label="网状网格" value="mesh"></el-option>
                            <el-option label="双线网状网格" value="doubleMesh"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="网格大小">
                        <el-slider
                            style="width:200px"
                            :min="0"
                            :max="40"
                            v-model="state.size"
                            @input="handleConfigChange"
                        ></el-slider>
                    </el-form-item>
                    <el-form-item label="主网格的厚度">
                        <el-slider
                            style="width:200px"
                            :min="0"
                            :max="10"
                            v-model="state.args[0].thickness"
                            @input="handleConfigChange"
                        ></el-slider>
                    </el-form-item>
                    <el-form-item label="主网格颜色">
                        <el-color-picker
                            v-model="state.args[0].color"
                            @change="handleConfigChange"
                        />
                    </el-form-item>

                    <el-form-item label="次网格的厚度" v-if="state.type == 'doubleMesh'">
                        <el-slider
                            style="width:200px"
                            :min="0"
                            :max="10"
                            v-model="state.args[1].thickness"
                            @input="handleConfigChange"
                        ></el-slider>
                    </el-form-item>

                    <el-form-item label="次网格颜色" v-if="state.type == 'doubleMesh'">
                        <el-color-picker
                            v-model="state.args[1].color"
                            @change="handleConfigChange"
                        />
                    </el-form-item>

                    <el-form-item label="主次网格线间隔" v-if="state.type == 'doubleMesh'">
                        <el-slider
                            style="width:200px"
                            :min="1"
                            :max="10"
                            v-model="state.args[1].factor"
                            @input="handleConfigChange"
                        ></el-slider>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <div style="text-align: center;">
                <el-button @click="reset" type="primary">恢复初设设置</el-button>
            </div>
        </el-tabs>
    </el-dialog>
</template>
<script setup="props, context">
import { defineEmits, defineProps, watch, toRefs, ref, reactive } from 'vue'
import BaseGraph from "../views/mindMap/baseGraph";
import { gridAtr } from "../views/mindMap/globalCfg.js"

const props = defineProps({
    modelValue: Boolean
});
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
let dialogVisible = ref(modelValue.value)
let activeName = ref('globalConfig')
let state = reactive(JSON.parse(JSON.stringify(gridAtr)))
function reset() {
    Object.assign(state, JSON.parse(JSON.stringify(gridAtr)))
    handleConfigChange()
}


function handleConfigChange() {
    BaseGraph.graph.drawGrid(state)
    BaseGraph.graph.setGridSize(state.size - 0)
}

watch(modelValue, () => {
    dialogVisible.value = modelValue.value
})
watch(dialogVisible, () => {
    emit('update:modelValue', dialogVisible.value)
})
</script>
<style   scoped>
</style>
 
 