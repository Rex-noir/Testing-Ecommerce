<script setup lang="ts">
const prop = defineProps(["image"]);
</script>
<template>
  <div
    :style="{ backgroundImage: `url(${prop.image[0]})` }"
    class="bg-cover bg-center shadow-lg hover:shadow-md hover:shadow-slate-950"
  />
</template>
