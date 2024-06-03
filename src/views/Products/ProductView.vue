<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Product } from "../../interfaces";
import FetchData from "../../utils/fetchData";
import Loading from "../../components/Loading/Loading.vue";

const route = useRoute();
const data = ref<Product | null>(null);
const isLoading = ref<boolean>(false);
const errorFound = ref<boolean>(false);
const totalItems = ref<number>(1);

const totalCost = computed(() => {
  if (data.value) {
    return totalItems.value * data.value.price;
  } else {
    return null;
  }
});

const handleNumbers = (operator: "plus" | "minus") => {
  if (operator === "plus") {
    totalItems.value++;
  } else {
    totalItems.value--;
  }
  if (totalItems.value <= 0) {
    totalItems.value = 1;
  }
};

onMounted(async () => {
  try {
    isLoading.value = true;
    data.value = (await FetchData.getProducts(route.params.id as string)).json;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    errorFound.value = true;
  }
});
</script>
<template>
  <div class="size-full" v-if="isLoading"><Loading></Loading></div>
  <div class="size-full" v-if="errorFound">Error fetching data.</div>
  <div
    v-if="data"
    class="mx-auto my-auto grid place-content-center p-2 md:h-full"
  >
    <div
      class="grid grid-rows-2 place-content-center place-items-center gap-2 md:grid-cols-12 md:grid-rows-1"
    >
      <div
        class="row-start-1 mx-auto grid place-content-center p-2 md:col-start-1 md:col-end-6 md:grid-rows-1 lg:w-4/5"
      >
        <img
          :src="data.images[0]"
          class="mx-auto w-full rounded-lg shadow-md shadow-slate-200"
        />
      </div>
      <div
        class="row-start-2 flex size-full flex-col justify-center gap-3 p-1 md:col-start-6 md:col-end-12 md:row-start-1"
      >
        <h2 class="text-lg font-bold">{{ data.title }}</h2>
        <span class="text-sm">{{ data.description }}</span>
        <div class="flex gap-2">
          <span class="rounded-lg bg-green-300 p-1 text-sm">{{
            data.category.name
          }}</span>
          <span class="rounded-lg bg-green-300 p-1 px-3 text-sm">{{
            data.category.id
          }}</span>
          <img
            :src="data.category.image"
            class="size-8 rounded-lg bg-green-300 text-sm"
          />
        </div>
        <div
          class="flex w-full items-center justify-around rounded-lg bg-sky-500 p-2"
        >
          <button
            class="rounded-lg bg-slate-50 px-4 text-lg font-bold"
            @click="handleNumbers('minus')"
          >
            -
          </button>
          <span
            class="w-[150px] rounded-lg bg-slate-100 p-2 text-center text-slate-950"
            >{{ totalItems }} * ${{ data.price }} = ${{ totalCost }}</span
          >
          <button
            class="rounded-lg bg-slate-50 px-4 text-lg font-bold"
            @click="handleNumbers('plus')"
          >
            +
          </button>
        </div>
        <button
          class="col-span-12 row-start-10 w-full rounded-lg bg-pink-400 p-2 text-center text-white transition-all ease-in-out hover:bg-stone-700"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
