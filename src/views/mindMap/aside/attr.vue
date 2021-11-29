<template>
  <div>
    <el-form label-position="right" label-width="60px" size="mini">
      <el-form-item label="文本">
        <el-input
          v-model="data.text"
          :rows="2"
          placeholder="Please input"
          @input="notifyChange"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="宽">
        <el-input size="mini" v-model.number="attrs.width" @input="notifyChange" />
      </el-form-item>
      <el-form-item label="高">
        <el-input size="mini" v-model.number="attrs.height" @input="notifyChange"   />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue";
let selectNode = null
let attrs = reactive({
  body: {},
  label: {
    text: ""
  }
})
let data = reactive({
  text: ""
})



const { proxy } = getCurrentInstance();
proxy.$EventBus.on("canvas-select-node", (node) => {
  selectNode = node
  console.log({ ...attrs, ...data })
  Object.assign(attrs, selectNode.getAttrs())
  Object.assign(data, selectNode.getData())

});
function notifyChange() {
  selectNode.attr(attrs)
  selectNode.setData(data)
}
</script>

<style>
</style>