<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import Header from "./components/Header/Header.vue";
import Loading from "./components/Loading/Loading.vue";
import { useUserInfo } from "./stores/user";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserInfo();
const loaded = ref<boolean>(false);

onBeforeMount(async () => {
  try {
    await userStore.loadUser();
  } finally {
    loaded.value = true;
  }
});
</script>

<template>
  <header
    v-if="loaded"
    class="row-start-1 row-end-1 m-2 h-fit rounded-lg shadow-lg shadow-slate-300"
  >
    <Header></Header>
  </header>
  <main class="row-start-2 mx-2">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive>
          <Suspense>
            <component :is="Component" :key="route.fullPath"></component>
            <template #fallback> <Loading></Loading> </template>
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
  </main>
</template>

<style scoped></style>
