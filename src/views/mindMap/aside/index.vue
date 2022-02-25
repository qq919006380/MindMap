<template>
  <div class="aside-template">
     <attr></attr>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import attr from "./attr.vue";
let activeName = ref("model");
const { proxy } = getCurrentInstance();
proxy.$EventBus.on("aside-tabs-activeName", (name) => {
  activeName.value = name;
});
proxy.$EventBus.on("aside-tabs-toggle", () => {
  activeName.value = activeName.value == 'model' ? 'attr' : 'model'
});

let disabled = ref(false)





</script>

<style scoped>
#stencil {
  width: 100%;
  height: calc(100vh - 100px);
}
.aside-template {
  padding: 0 0 0 15px;
  display: inline-block;
  width: 100%;
}
</style>