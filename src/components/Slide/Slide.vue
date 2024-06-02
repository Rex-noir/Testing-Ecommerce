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
      class="mx-auto grid h-[300px] w-full max-w-[90%] grid-cols-1 place-content-center gap-1 overflow-hidden rounded-lg p-2 transition-all md:h-[800px] md:grid-cols-7 md:grid-rows-12"
    >
      <Transition
        enter-from-class="translate-x-[100%] scale-100"
        leave-from-class="scale-75"
        leave-to-class="scale-0 translate-x-[-100%]"
      >
        <Image
          v-if="products[prevIndex] && currentIndex > 0"
          :key="products[prevIndex].id"
          :image="products[prevIndex].images"
          class="col-start-2 row-start-1 h-[300px] w-[100%] scale-75 rounded-lg duration-200 md:col-start-1 md:col-end-3 md:row-start-9 md:row-end-13"
        ></Image>
      </Transition>
      <Transition
        leave-to-class="translate-x-[-100%] scale-75"
        leave-from-class="scale-100"
        enter-from-class="translate-x-[100%] scale-75"
      >
        <Image
          v-if="products[currentIndex]"
          :image="products[currentIndex].images"
          :key="products[currentIndex].id"
          class="col-start-1 row-start-1 h-[300px] w-[100%] rounded-lg duration-200 md:col-start-3 md:col-end-6 md:row-start-6 md:row-end-9"
        ></Image>
      </Transition>
      <Transition
        leave-to-class="translate-x-[-100%] scale-100"
        leave-from-class="scale-75"
        enter-from-class="translate-x-[100%] scale-0"
      >
        <Image
          v-if="products[nextIndex]"
          :key="products[nextIndex].id"
          :image="products[nextIndex].images"
          class="col-start-3 row-start-1 h-[300px] w-[100%] scale-75 rounded-lg duration-200 md:col-start-6 md:col-end-8 md:row-start-1 md:row-end-3"
        ></Image>
      </Transition>
    </div>
  </div>
</template>
