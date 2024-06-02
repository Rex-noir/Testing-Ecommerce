<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import FetchData from "../../utils/fetchData";
import Image from "./Image.vue";

const products = ref<any[]>([]);
const currentIndex = ref(0);

onMounted(async () => {
  try {
    const result = await FetchData.getProducts();
    products.value = result.json;
    setInterval(() => nextSlide(), 3000);
  } catch (err) {
    console.log(err);
  }
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % products.value.length;
};

const prevIndex = computed(
  () =>
    (currentIndex.value - 1 + products.value.length) % products.value.length,
);
const nextIndex = computed(
  () => (currentIndex.value + 1) % products.value.length,
);
</script>
<template>
  <div>
    <div
      class="mx-auto grid h-[300px] w-full max-w-[90%] grid-cols-1 place-content-center gap-1 overflow-hidden rounded-lg p-2 transition-all md:grid-cols-7 md:grid-rows-12"
    ></div>
  </div>
</template>
