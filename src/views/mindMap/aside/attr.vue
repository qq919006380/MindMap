<template>
  <div>
    <el-input
      v-model="attrs.label.text"
      :rows="2"
      type="textarea"
      placeholder="Please input"
      @input="notifyChange"
    />
    <el-input-number size="mini" v-model="attrs.num" @input="notifyChange" />
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue";
let attrs = reactive({
  body: {},
  label: {
    text:""
  }
})

let selectNode = null
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("canvas-select-node", (node) => {
  selectNode = node
  Object.assign(attrs,selectNode.getAttrs())
  console.log(selectNode.getAttrs())
});
function notifyChange() {
  console.log(selectNode)
  selectNode.attr(attrs)
}
</script>

<style>
</style>