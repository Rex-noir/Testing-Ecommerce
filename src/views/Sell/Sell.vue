<script setup lang="ts">
import { onMounted, ref } from "vue";
import FetchData from "../../utils/fetchData";
import { Category } from "../../interfaces";
import Loading from "../../components/Loading/Loading.vue";
import NewCategory from "./NewCategory.vue";
import { validateProduct } from "../../utils/validator";
import { createProduct } from "../../utils/auth";
import { useRouter } from "vue-router";

const isLoading = ref<boolean>(false);
const errorFound = ref<boolean>(false);
const status = ref<string>("");

const title = ref<string>("");
const price = ref<string>("");
const description = ref<string>("");

const firstImage = ref<string>("");
const secondImage = ref<string>("");
const thirdImage = ref<string>("");
const categoryID = ref<number>();

const router = useRouter();

const categories = ref<Category[] | null>(null);

onMounted(async () => fetchData());

const fetchData = async () => {
  try {
    errorFound.value = false;
    isLoading.value = true;
    categories.value = (await FetchData.getCategories()).json;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    errorFound.value = true;
  }
};

const submit = async () => {
  const result = validateProduct(title.value, price.value, description.value, [
    firstImage.value,
    secondImage.value,
    thirdImage.value,
  ]);
  if (result.result === true) {
    status.value = "Let's go!";
    try {
      isLoading.value = true;
      await createProduct({
        title: title.value,
        price: Number(price.value),
        description: description.value,
        categoryId: Number(categoryID.value),
        images: [firstImage.value, secondImage.value, thirdImage.value],
      });
      isLoading.value = false;
      errorFound.value = false;
      status.value = "Please check at the main homepage to see your product";
      router.push("/");
    } catch (error) {
      errorFound.value = true;
      isLoading.value = false;
    }
  } else {
    status.value = result.message;
  }
};
</script>
<template>
  <div v-if="isLoading"><Loading></Loading></div>
  <div v-if="errorFound">Error Loading</div>
  <div
    v-if="categories"
    class="mx-auto my-auto grid h-full place-content-center gap-3 md:w-1/2"
  >
    <h1 class="text-center text-lg font-bold">Sell your products</h1>
    <div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        v-model="title"
        id="title"
        class="w-full rounded-lg border-2 border-stone-500 bg-slate-200 p-2 shadow-lg shadow-slate-200 focus-within:outline-none"
      />
    </div>
    <div>
      <input
        type="text"
        v-model="price"
        name="price"
        placeholder="Price"
        id="price"
        class="w-full rounded-lg border-2 border-stone-500 bg-slate-200 p-2 shadow-lg shadow-slate-200 focus-within:outline-none"
      />
    </div>
    <div>
      <textarea
        name="description"
        id="description"
        v-model="description"
        class="w-full rounded-lg border-2 border-stone-500 bg-slate-200 p-2 focus-within:outline-none"
        placeholder="Description"
      ></textarea>
    </div>
    <div class="flex flex-col gap-2">
      <span class="font-bold">Images</span>
      <input
        type="url"
        v-model="firstImage"
        name="image1"
        placeholder="First Image URL"
        id="image1"
        class="rounded-lg border-2 border-stone-500 bg-slate-200 p-2"
      />
      <input
        type="url"
        name="image2"
        v-model="secondImage"
        placeholder="Second Image URL"
        id="image2"
        class="rounded-lg border-2 border-stone-500 bg-slate-200 p-2"
      />
      <input
        type="url"
        name="image3"
        v-model="thirdImage"
        placeholder="Third Image URL"
        id="image3"
        class="rounded-lg border-2 border-stone-500 bg-slate-200 p-2"
      />
    </div>
    <div class="flex flex-col gap-2">
      <span class="font-bold">Select One Category</span>
      <div>
        <button
          v-for="category in categories"
          @click="categoryID = category.id"
          :class="{ 'bg-slate-900 text-white': categoryID === category.id }"
          class="ml-2 mt-2 w-fit border-2 border-stone-500 bg-slate-50 p-1 shadow-lg hover:bg-slate-800 hover:text-white active:shadow-slate-300"
        >
          {{ category.name }}
        </button>

        <NewCategory @update="fetchData"></NewCategory>
      </div>
    </div>
    <p class="text sm text-purple-900">
      {{ status.length === 0 ? " " : status }}
    </p>
    <button
      @click="submit"
      class="mx-auto w-full border-2 border-stone-500 p-1 px-3 hover:bg-slate-800 hover:text-white"
    >
      Sell
    </button>
  </div>
</template>
