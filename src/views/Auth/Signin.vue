<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Email from "../../components/Forms/Email.vue";
import Password from "../../components/Forms/Password.vue";
import SignButton from "../../components/Forms/SignButton.vue";
import { validateFMail, validateFPassword } from "../../utils/validator";
import { AuthError, authUser } from "../../utils/auth";
import CookieManager from "../../utils/cookie";

const email = ref<string>("");
const password = ref<string>("");

const message = ref<string>("");
const submit = async () => {
  const validateEmail = validateFMail(email.value);
  const validatePass = validateFPassword(password.value);

  if (validateEmail.result === false) {
    message.value = validateEmail.message;
  } else if (validatePass.result === false) {
    message.value = validatePass.message;
  } else {
    try {
      message.value = "Authenticating...";
      const { json: authJson } = await authUser(email.value, password.value);
      if (authJson && authJson.access_token) {
        CookieManager.set("userAuth", `${authJson.access_token}`, 20);
        window.location.href = "/";
      }
    } catch (error) {
      if (error instanceof AuthError) {
        message.value = error.response?.statusText as string;
      } else {
        message.value = "Authentication failed";
      }
    }
  }
};
const event = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    submit();
  }
};
onMounted(() => {
  document.addEventListener("keyup", event);
});
onBeforeUnmount(() => {
  document.removeEventListener("keyup", event);
});
</script>
<template>
  <div
    class="container mx-auto my-auto grid w-72 max-w-72 place-content-center gap-2"
  >
    <h1 class="text-center text-2xl font-bold">Login</h1>
    <Email v-model:email="email"></Email>
    <Password v-model:password="password"></Password>
    <p class="max-w-full p-2 text-center text-sm text-purple-900">
      {{ message.length > 0 ? message : "&nbsp;" }}
    </p>
    <SignButton :text="'Sign In'" @click="submit"></SignButton>
  </div>
</template>
