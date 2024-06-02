<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Navigation from "./Navigation.vue";
import { useUserInfo } from "../../stores/user";
import CookieManager from "../../utils/cookie";
import Search from "../Search/Search.vue";

const clicked = ref(false);
const hideNavigation = () => {
  clicked.value = false;
};
const toggleNavigation = () => {
  clicked.value = !clicked.value;
};
const logout = () => {
  CookieManager.delete("userAuth");
  window.location.reload();
};
const loggedIn = useUserInfo().loggedIn;

const onClickedOutside = (e: Event) => {
  const target = e.target as HTMLElement;
  const dropdown = document.querySelector("#dropdown");
  if (!dropdown?.contains(target)) {
    hideNavigation();
  }
};

onMounted(() => {
  window.addEventListener("click", onClickedOutside);
});
onUnmounted(() => {
  window.removeEventListener("click", onClickedOutside);
});
</script>
<template>
  <div
    class="mx-auto grid w-full grid-cols-[auto_auto_auto] gap-3 p-4 text-slate-900 md:grid-cols-3"
  >
    <div id="dropdown" class="flex items-center md:hidden">
      <button @click="toggleNavigation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="black"
        >
          <path
            d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
          />
        </svg>
      </button>
      <div
        class="fixed left-0 top-0 z-40 h-full w-0 bg-slate-50 shadow-lg shadow-slate-950 transition-[width] duration-200 ease-in-out"
        :class="{ 'w-52': clicked }"
      >
        <Navigation v-if="clicked" v-model="clicked"></Navigation>
      </div>
    </div>
    <Transition>
      <div
        id="logo-container"
        class="col-start-1 hidden border-transparent p-1 text-left md:block"
      >
        <RouterLink to="/">
          <span class="my-auto">Commerce</span>
        </RouterLink>
      </div>
    </Transition>
    <div id="search-container" class="container col-start-2 mx-auto w-full">
      <Search></Search>
    </div>

    <div>
      <nav class="col-start-3 flex justify-end gap-3">
        <RouterLink
          to="/"
          active-class="text-amber-700"
          class="hidden p-1 hover:text-green-600 md:block"
        >
          <span>Home</span>
        </RouterLink>
        <RouterLink
          to="/auth/login"
          v-if="!loggedIn"
          class="hidden p-1 hover:text-green-500 md:block"
          active-class="text-amber-700"
          ><span>Login</span>
        </RouterLink>
        <RouterLink
          to="/auth/signup"
          v-show="!loggedIn"
          class="hidden p-1 hover:text-green-500 md:block"
          active-class="text-amber-700"
          ><span>Signup</span>
        </RouterLink>
        <a
          v-show="loggedIn"
          active-class="text-amber-700"
          class="hidden cursor-pointer p-1 hover:text-green-500 md:block"
          ><span @click="logout">Logout</span>
        </a>
        <RouterLink
          v-if="loggedIn"
          to="/profile/me"
          class="hidden w-fit items-center justify-center gap-1 rounded-full bg-slate-200 p-1 text-center hover:bg-amber-50 hover:text-green-500 active:scale-[1.1] md:flex"
          active-class=" text-amber-500"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="black"
          >
            <path
              d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z"
            />
          </svg>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
<style scoped>
.v-enter-active {
  transition: opacity 0.5s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
