<script setup lang="ts">
const props = defineProps(["text"]);
const emit = defineEmits(["click"]);
const buttonClicked = () => {
  emit("click");
};
</script>
<template>
  <div class="flex justify-center">
    <button
      @click="buttonClicked"
      class="rounded-lg border-2 border-slate-900 bg-slate-100 p-2 shadow-slate-800 transition-all ease-linear hover:scale-[0.9] hover:bg-slate-900 hover:text-slate-50 hover:shadow-md active:scale-100 active:duration-75"
    >
      {{ props.text }}
    </button>
  </div>
</template>
