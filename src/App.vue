<script setup lang="ts">
import { onBeforeMount } from "vue";
import Header from "./components/Header/Header.vue";
import Loading from "./components/Loading/Loading.vue";
import { useUserInfo } from "./stores/user";

onBeforeMount(async () => {
  const user = useUserInfo();
  await user.loadUser();
});
</script>

<template>
  <header class="row-start-1 row-end-1 h-fit">
    <Header></Header>
  </header>
  <main class="row-start-2 mx-2 mt-1 grid gap-1">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive>
          <Suspense>
            <component :is="Component"></component>
            <template #fallback> <Loading></Loading> </template>
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
  </main>
</template>

<style scoped></style>
