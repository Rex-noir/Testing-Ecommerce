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
  <div v-if="userData" class="mt-[-6px] size-full">
    <div class="relative flex flex-col items-center justify-center">
      <div
        class="relative z-20 mx-auto flex h-[200px] w-full items-center justify-center rounded-lg bg-orange-300 shadow-lg shadow-slate-500 md:h-[200px] md:w-1/2"
      >
        <img
          :src="userData.avatar"
          class="absolute top-1/2 z-30 size-48 rounded-full shadow-md shadow-slate-100"
        />
      </div>

      <div
        class="h-full- flex w-full flex-col items-center justify-center rounded-lg bg-slate-500 p-3 md:w-1/2"
      >
        <div class="h-[100px]"></div>
        <div class="flex h-full flex-col items-center justify-center space-y-4">
          <h2 class="text-2xl">{{ userData.name }}</h2>

          <p>
            <span>Email: </span> <span> {{ userData.email }}</span>
          </p>
          <p>
            <span>Role: </span> <span> {{ userData.role }}</span>
          </p>
          <p>
            <span>Id: </span> <span> {{ userData.id }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
