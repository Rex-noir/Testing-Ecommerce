<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import FetchData from "../../utils/fetchData";
import { Product, User } from "../../interfaces";
import Loading from "../Loading/Loading.vue";
import { useRouter } from "vue-router";

const showProducts = ref<boolean>(false);
const showUsers = ref<boolean>(false);
const data = ref<null | Product[]>(null);
const productResults = ref<Product[] | null>(null);
const userResults = ref<User[] | null>(null);
const loading = ref<boolean>(false);

const notFound = ref<boolean>(false);
const isError = ref<boolean>(false);

const router = useRouter();

const hideResult = () => {
  showProducts.value = false;
  showUsers.value = false;
  notFound.value = false;
};

const updateShow = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length > 0) {
    search(input.value);
  } else {
    showProducts.value = false;
  }
};
const isProducts = ref<boolean>(true);

const search = async (query: string) => {
  try {
    if (isProducts.value === true) searchProducts(query);
    else {
      searchUsers(query);
    }
  } catch (error) {
    notFound.value = true;
    isError.value = true;
    loading.value = false;
  }
};

const searchUsers = async (query: string) => {
  loading.value = true;
  const users = await FetchData.getAllUsers();
  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()),
  );
  showProducts.value = false;
  loading.value = false;

  if (filtered.length > 0) {
    userResults.value = filtered;
    showUsers.value = true;
    notFound.value = false;
  } else {
    userResults.value = null;
    showUsers.value = false;
    notFound.value = true;
  }
};

const searchProducts = async (query: string) => {
  loading.value = true;
  isError.value = false;
  showUsers.value = false;

  const response = await FetchData.getProducts(undefined, { title: query });
  data.value = (await response.json) as Product[];

  if (data.value && data.value.length > 0) {
    productResults.value = data.value;
    loading.value = false;
    showProducts.value = true;
  } else {
    productResults.value = null;
    showProducts.value = false;
    notFound.value = true;
    loading.value = false;
  }
};

watch([showProducts, showUsers], ([newShowProducts, newShowUsers]) => {
  if (newShowProducts === true || newShowUsers === true) {
    document.addEventListener("keyup", escClicked);
    window.addEventListener("click", onClickedOutside);
  } else {
    document.removeEventListener("keyup", escClicked);
    window.removeEventListener("click", onClickedOutside);
  }
});
const escClicked = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    showProducts.value = false;
    showUsers.value = false;
    notFound.value = false;
  }
};

const userClicked = (id: number) => {
  router.push(`/profile/${id}`);
  hideResult();
};

const productClicked = (id: number) => {
  router.push(`/products/${id}`);
  hideResult();
};

const onClickedOutside = (e: Event) => {
  const target = e.target as HTMLElement;
  const container = document.querySelector("#productResults-container");
  if (!container?.contains(target)) {
    hideResult();
  }
};
</script>
<template>
  <div id="search-result-container-hehe" class="relative mx-auto w-full">
    <div
      v-if="showProducts || showUsers"
      class="fixed inset-0 z-10 bg-black opacity-50"
    ></div>
    <div class="relative z-20 flex items-center justify-center">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        @input="updateShow"
        class="w-full rounded-md bg-slate-200 p-2 shadow-sm focus-within:outline-none"
      />
      <button
        @click="isProducts = !isProducts"
        :class="{
          ['bg-slate-900 text-white']: !isProducts,
          'bg-none': isProducts,
        }"
        class="absolute right-8 rounded-lg border-2 border-stone-400 px-2 transition-all duration-200 hover:scale-90 active:scale-105"
      >
        Users
      </button>
    </div>
    <Loading v-if="loading" class="absolute z-50 mt-3"></Loading>
    <div v-if="notFound" class="absolute z-50 mt-3 w-full text-center">
      No productResults!
    </div>
    <div
      id="productResults-container"
      v-show="showProducts || showUsers"
      class="absolute z-30 row-start-2 mt-2 flex max-h-screen w-full flex-col gap-2 overflow-y-auto rounded-md bg-slate-900 p-2 text-slate-50 shadow-sm backdrop-brightness-50"
    >
      <div>
        <button
          v-for="product in productResults"
          v-if="showProducts"
          @click="productClicked(product.id)"
          class="w-full rounded-sm p-2 text-left hover:bg-slate-50 hover:text-black"
        >
          {{ product.title }}
        </button>
        <button
          v-for="user in userResults"
          v-if="showUsers"
          @click="userClicked(user.id)"
          class="w-full rounded-sm p-2 text-left hover:bg-slate-50 hover:text-black"
        >
          {{ user.name }}
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
#productResults-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#productResults-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
