<script setup lang="ts">
import { useUserInfo } from "../../stores/user";
import defaultProfile from "../../assets/profile.svg";
import { ref } from "vue";

const user = useUserInfo();

const profile = ref(defaultProfile);
if (user.loggedIn && user.info?.avatar) {
  profile.value = user.info.avatar;
}

const model = defineModel();
const closeDrawer = () => {
  model.value = false;
};
</script>
<template>
  <div id="dropdown-contents" class="relative grid grid-rows-12">
    <div id="close" class="absolute right-0 row-start-1 flex justify-end p-2">
      <svg
        class="nav-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="black"
        @click="closeDrawer"
      >
        <path
          d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        />
      </svg>
    </div>
    <div class="row-start-1 flex flex-col items-center">
      <div class="items-center justify-self-center text-center">
        <img
          :src="profile"
          :alt="
            user.loggedIn
              ? `${user?.info?.name}'s Profile Picture'`
              : 'Profile picture'
          "
          class="mt-10 h-[200px] rounded-full p-5"
        />
      </div>
      <p class="mt-1 text-xl font-bold text-purple-400">
        {{ user.info?.name ? user.info.name : "User is not signed in" }}
      </p>
      <RouterLink
        @click="closeDrawer"
        v-if="user.loggedIn"
        to="/profile/me"
        class="flex w-full items-center justify-center gap-1 p-1 text-center hover:text-green-500"
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
        <span>User Setting</span>
      </RouterLink>
    </div>
    <ul
      class="row-start-2 mt-4 flex flex-col items-center gap-5 border-t-2 p-2"
    >
      <li @click="closeDrawer">
        <RouterLink
          to="/"
          active-class="text-amber-700"
          class="p-1 hover:text-green-500 md:hidden"
        >
          Home
        </RouterLink>
      </li>
      <li @click="closeDrawer">
        <RouterLink
          to="/auth/login"
          v-if="!user.loggedIn"
          class="border-b-4 border-transparent p-1 hover:text-green-500"
          active-class="text-amber-700"
          ><span>Login</span>
        </RouterLink>
      </li>
      <li @click="closeDrawer" v-if="!user.loggedIn">
        <RouterLink
          to="/auth/signup"
          class="p-1 hover:text-green-500 md:hidden"
          active-class="text-amber-700"
          >Signup
        </RouterLink>
      </li>
      <li @click="closeDrawer">
        <RouterLink
          to="/about"
          class="p-1 hover:text-green-500"
          active-class="text-amber-700"
          >About
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>
svg.nav-icon:hover path {
  fill: green;
}
svg.profile-icon:hover path {
  fill: grey;
}
svg.profile-icon:active path {
  fill: rgb(152, 255, 152);
  opacity: 0.4;
}
</style>
