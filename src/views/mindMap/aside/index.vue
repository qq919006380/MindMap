<template>
  <div class="aside-template">
    <attr v-if="type == 'attr'"></attr>
    <edge v-else-if="type == 'edge'"></edge>
  </div>
</template>

<script setup>
import { computed } from "vue";
import attr from "./attr.vue";
import edge from "./edge.vue"
import { useStore } from "vuex";
const store = useStore()
const type = computed(() => store.state.editor.asideDrawerObj.type)

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