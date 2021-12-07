<template>
  <div class="er-template">{{ data.text }}</div>
</template>
<script setup>
import { inject, reactive } from 'vue';
let getNode = inject("getNode")
let getGraph = inject("getGraph")
let data = reactive(getNode().getData())
getNode().on('change:data', ({ current }) => {
  data.text = current.text
})
</script>
<style   scoped>
.er-template {
  width: 100%;
  height: 100%;
  color: #666;
  word-break: break-all;
  white-space: pre-line;
}
</style>
