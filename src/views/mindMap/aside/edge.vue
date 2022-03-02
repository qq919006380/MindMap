<template>edge</template>
<script setup>
import { getCurrentInstance, ref } from "vue";
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("update-canvasTarget-data", (edge) => {
    console.log(edge)
})
</script>