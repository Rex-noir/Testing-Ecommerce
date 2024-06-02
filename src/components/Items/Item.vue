<script setup lang="ts">
import { reactive, ref, watch } from "vue";

const props = defineProps(["data"]);
const data = props.data;

const titleRef = ref<HTMLElement | null>(null);
const parentRef = ref<HTMLElement | null>(null);
const status = reactive({ animateTitle: false });

watch([titleRef, parentRef], ([newTitle, newParent]) => {
  if (newTitle instanceof HTMLElement && newParent instanceof HTMLElement) {
    status.animateTitle = newTitle.scrollWidth > newParent.clientWidth;
  }
});
</script>
<template>
  <div
    id="item"
    ref="parentRef"
    class="h-[350 px] grid border-collapse grid-rows-9 place-items-center gap-1 overflow-hidden rounded-xl border-2 border-slate-400 bg-slate-100 shadow-md"
  >
    <span
      aria-label="Item title"
      class="row-start-1 row-end-2 mx-auto overflow-auto whitespace-nowrap p-2 text-sm shadow-sm"
      :class="{ 'animate-rotate': status.animateTitle }"
      ref="titleRef"
      >{{ data.title }}
    </span>
    <img
      :src="data.images[0]"
      class="row-start-2 row-end-8 w-5/6 rounded-lg shadow-lg"
    />
    <button
      class="duration-400 row-start-8 row-end-10 rounded-full border-2 border-slate-400 bg-gray-300 p-1 px-2 transition-all ease-in hover:bg-blue-800 hover:text-slate-100"
    >
      BUY ${{ data.price }}
    </button>
  </div>
</template>
