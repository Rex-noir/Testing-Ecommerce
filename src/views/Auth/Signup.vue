<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Email from "../../components/Forms/Email.vue";
import Password from "../../components/Forms/Password.vue";
import Username from "../../components/Forms/Username.vue";
import SignButton from "../../components/Forms/SignButton.vue";
import Avatar from "../../components/Forms/Avatar.vue";
import {
  validateFMail,
  validateFPassword,
  validateFUsername,
} from "../../utils/validator";
import { AuthError, createUser } from "../../utils/auth";
import { useRouter } from "vue-router";

const email = ref<string>("");
const password = ref<string>("");
const firstname = ref<string>("");
const lastname = ref<string>("");
const avatarURL = ref<string>("");
const message = ref<string>("");
const router = useRouter();

const submit = async () => {
  const validateMail = validateFMail(email.value);
  const validatePass = validateFPassword(password.value);
  const validateUname = validateFUsername(
    firstname.value + " " + lastname.value,
  );

  if (
    validateMail.result === true &&
    validatePass.result === true &&
    validateUname.result === true &&
    avatarURL.value.length > 0
  ) {
    try {
      message.value = "Creating account";
      await createUser({
        name: firstname.value + " " + lastname.value,
        password: password.value,
        email: email.value,
        avatar: avatarURL.value,
      });
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof AuthError) {
        message.value = error.response?.statusText as string;
      } else {
        throw error;
      }
    }
  } else if (validateMail.result === false) {
    message.value = validateMail.message;
  } else if (validatePass.result === false) {
    message.value = validatePass.message;
  } else if (validateUname.result === false) {
    message.value = validateUname.message;
  } else if (avatarURL.value.length <= 0) {
    message.value = "Please enter your avatar url";
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
    <h1 class="text-center text-2xl font-bold">Sign Up</h1>
    <Username
      v-model:firstname="firstname"
      v-model:lastname="lastname"
    ></Username>
    <Email v-model:email="email"></Email>
    <Password v-model:password="password"></Password>
    <Avatar v-model:avatar-u-r-l="avatarURL"></Avatar>
    <p class="p-2 text-center text-sm text-purple-600">
      {{ message.length > 0 ? message : "Please fill out all the fields!" }}
    </p>
    <SignButton :text="'Sign Up'" @click="submit"></SignButton>
  </div>
</template>
