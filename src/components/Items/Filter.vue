<script setup lang="ts">
import { ref } from "vue";
import FetchData from "../../utils/fetchData";
import Loading from "../Loading/Loading.vue";

const data = await FetchData.getCategories();
const categories = ref(data.json);
const model = defineModel();

const emits = defineEmits(["updateList"]);
//selected
const selected = ref<null | number>(null);
const isLoading = ref(false);

const markClicked = async (id: number) => {
  isLoading.value = true;
  if (selected.value === id) {
    selected.value = null;
    model.value = await FetchData.getProducts();
  } else {
    selected.value = id;
    model.value = await FetchData.getProdsByCategoriy(id);
  }
  isLoading.value = false;
};
</script>
<template>
  <div
    id="filter"
    class="relative mx-auto flex w-full flex-col justify-center gap-2 rounded-lg md:p-2"
  >
    <p class="text-center font-bold">Categories</p>

    <div
      id="categories"
      class="grid grid-cols-[repeat(auto-fill,_150px)] place-content-center gap-y-1"
    >
      <button
        v-for="category in categories"
        :key="category.id"
        :class="[
          '  overflow-hidden  border-l-2 border-r-2 border-slate-800 bg-slate-100 p-1 shadow-lg transition-all duration-300 hover:bg-slate-900 hover:text-slate-50 hover:shadow-slate-800 ',
          { 'bg-slate-900 text-slate-200': selected === category.id },
        ]"
        @click="markClicked(category.id)"
      >
        {{ category.name }}
      </button>
    </div>
    <Loading v-if="isLoading" class="absolute translate-y-1/2"></Loading>
  </div>
</template>
