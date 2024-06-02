<script setup lang="ts">
const props = defineProps(["text"]);
</script>
<template>
  <button
    class="h-6 rounded-sm bg-slate-50 p-0 px-1 py-0 text-sm ring-1 ring-slate-900 transition-all hover:scale-[0.9] hover:bg-slate-800 hover:text-white active:scale-[1.1]"
  >
    {{ props.text }}
  </button>
</template>
