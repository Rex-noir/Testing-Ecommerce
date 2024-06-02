import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { User } from "../interfaces";
import CookieManager from "../utils/cookie";
import { userWithSession } from "../utils/auth";

export const useUserInfo = defineStore("user", () => {
  const info = ref<User | null>(null);
  const loggedIn = ref(false);

  async function loadUser() {
    try {
      const cookie = CookieManager.get("userAuth");
      if (cookie !== undefined) {
        const userData = await userWithSession(cookie);
        if (userData.response.ok && userData.json) {
          setUser(userData.json);
        } else {
          window.location.href = "/signin";
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  function clearUser() {
    info.value = null;
    loggedIn.value = false;
    CookieManager.delete("userAuth");
  }
  function setUser(userInfo: User) {
    info.value = userInfo;
    loggedIn.value = true;
  }
  const getUser = computed(() => info.value);
  loadUser();
  return {
    info,
    loggedIn,
    setUser,
    loadUser,
    getUser,
    clearUser,
  };
});
