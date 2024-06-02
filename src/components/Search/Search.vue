<script setup lang="ts">
import { ref } from "vue";
import FetchData from "../../utils/fetchData";
import { Product } from "../../interfaces";
import Loading from "../Loading/Loading.vue";

const show = ref<boolean>(false);
const data = ref<null | Product[]>(null);
const result = ref<Product[] | null>(null);
const loading = ref<boolean>(false);

const notFound = ref<boolean>(false);
const isError = ref<boolean>(false);

const updateShow = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length > 0) {
    search(input.value);
  } else {
    show.value = false;
  }
};

const search = async (query: string) => {
  try {
    loading.value = true;
    isError.value = false;

    const response = await FetchData.getProducts(undefined, { title: query });
    data.value = (await response.json) as Product[];

    if (data.value && data.value.length > 0) {
      result.value = data.value;
      loading.value = false;
      show.value = true;
    } else {
      result.value = null;
      show.value = false;
      notFound.value = true;
      loading.value = false;
    }
  } catch (error) {
    notFound.value = true;
    isError.value = true;
    loading.value = false;
  }
};
</script>
<template>
  <div class="relative mx-auto w-full">
    <div v-if="show" class="fixed inset-0 z-10 bg-black opacity-50"></div>
    <div class="relative z-20 flex items-center justify-center">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        @input="updateShow"
        @focusout="
          show = false;
          notFound = false;
        "
        class="w-full rounded-md bg-slate-200 p-2 shadow-sm focus-within:outline-none"
      />
    </div>
    <Loading v-if="loading" class="absolute z-50 mt-3"></Loading>
    <div v-if="notFound" class="absolute z-50 mt-3 w-full text-center">
      No result!
    </div>
    <div
      id="result-container"
      v-show="show"
      class="absolute z-30 row-start-2 mt-2 flex w-full flex-col gap-2 overflow-y-auto rounded-md bg-slate-900 p-2 text-slate-50 shadow-lg shadow-slate-900 backdrop-brightness-50"
    >
      <div>
        <button
          v-for="product in result"
          class="w-full rounded-lg p-2 text-left hover:bg-slate-50 hover:text-black"
        >
          {{ product.title }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
input#search {
  background-image: url("../../assets/search_icon.svg");
  background-repeat: no-repeat;
  background-position: 10px 10px;
  padding-left: 40px;
}
#result-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#result-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
