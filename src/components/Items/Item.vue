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
    class="grid grid-cols-5 grid-rows-[auto_auto] place-items-center gap-3 overflow-hidden rounded-lg border-t-2 border-slate-400 p-2 shadow-2xl hover:shadow-slate-500"
  >
    <span
      aria-label="Item title"
      class="col-span-6 col-start-1 mx-auto overflow-auto whitespace-nowrap"
      :class="{ 'animate-rotate': status.animateTitle }"
      ref="titleRef"
      >{{ data.title }}
    </span>
    <img
      :src="data.images[0]"
      class="col-span-3 row-start-2 overflow-auto rounded-lg"
    />
    <div
      id="details"
      class="col-span-3 col-start-4 flex flex-col items-center justify-center gap-3 overflow-clip text-sm"
    >
      <p class="overflow-hidden">Price : ${{ data.price }}</p>
      <p class="text-xs">Category : {{ data.category.name }}</p>
      <div class="flex w-full items-center justify-between gap-1">
        <button
          class="rounded-lg bg-slate-600 p-2 shadow-xl outline-none transition-all duration-500 hover:bg-slate-950"
        >
          <img src="/src/assets/cart.svg" alt="Add to cart" />
        </button>
        <button
          class="rounded-lg bg-slate-600 p-2 shadow-xl outline-none transition-all duration-500 hover:bg-slate-950"
        >
          <img src="/src/assets/shop.svg" alt="Buy" />
        </button>
      </div>
      <button
        class="rounded-lg bg-slate-800 p-2 text-white shadow-xl transition-all duration-500 hover:bg-amber-200 hover:text-black active:rotate-3 active:scale-105 active:transform-gpu active:outline-none"
      >
        Details
      </button>
    </div>
  </div>
</template>
