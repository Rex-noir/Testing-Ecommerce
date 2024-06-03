<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { User } from "../../interfaces";
import FetchData from "../../utils/fetchData";
import Loading from "../../components/Loading/Loading.vue";

const router = useRoute();
const userData = ref<User | null>(null);
const isError = ref<boolean>(false);
const isLoading = ref<boolean>(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    userData.value = await FetchData.getUserInfo(router.params.id as string);
    isLoading.value = false;
  } catch (error) {
    isError.value = true;
  }
});
</script>
<template>
  <div v-if="isLoading" class="size-full">
    <Loading></Loading>
  </div>
  <div v-if="isError" class="size-full">Error fetching data</div>
  <div
    v-if="userData"
    class="md:grid-rows grid size-full grid-cols-12 grid-rows-2 place-items-center gap-3 md:grid-rows-1"
    :key="userData?.id"
  >
    <div
      class="col-span-12 col-start-1 flex h-full w-full items-center rounded-lg bg-slate-500 md:col-span-4 md:col-start-1"
    >
      <div
        class="h mx-auto size-56 rounded-b-full border-2 bg-slate-400 p-3 shadow-lg shadow-slate-400 md:bg-gray-400"
      >
        <img
          :src="userData?.avatar"
          class="h-full w-full rounded-full shadow-lg"
          :alt="userData?.name + `'s avatar`"
        />
      </div>
    </div>
    <div
      class="col-span-12 row-start-2 mx-auto flex w-full flex-col gap-3 md:col-start-6 md:row-start-1"
    >
      <p class="w-full rounded-full bg-slate-400 p-3 text-center">
        {{ userData?.name }}
      </p>
      <p class="w-full rounded-full bg-slate-400 p-3 text-center">
        {{ userData?.email }}
      </p>
      <p class="w-full rounded-full bg-slate-400 p-3 text-center">
        {{ userData?.role }}
      </p>
      <p class="w-full rounded-full bg-slate-400 p-3 text-center">
        ID:{{ userData?.id }}
      </p>
    </div>
  </div>
</template>
