<script setup lang="ts">
import { useUserInfo } from "../../stores/user";
import Username from "../../components/Forms/Username.vue";
import Password from "../../components/Forms/Password.vue";
import Email from "../../components/Forms/Email.vue";
import Avatar from "../../components/Forms/Avatar.vue";
import SignButton from "../../components/Forms/SignButton.vue";
import { User } from "../../interfaces";
import { ref } from "vue";
import {
  validateFMail,
  validateFPassword,
  validateFUsername,
} from "../../utils/validator";
import { AuthError, updateUser } from "../../utils/auth";

const userInfo = useUserInfo();
const info = userInfo.getUser as User;

const email = ref<string>(info.email);
const password = ref<string>(info.password);
const firstname = ref<string>(
  info.name.split(" ")[0] ? info.name.split(" ")[0] : " ",
);
const lastname = ref<string>(
  info.name.split(" ")[1] ? info.name.split(" ")[1] : " ",
);
const avatar = ref<string>(info.avatar);
const message = ref<string>("");

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
    avatar.value.length > 0
  ) {
    try {
      message.value = "Updating......";
      await updateUser(info.id, {
        password: password.value,
        avatar: avatar.value,
        name: firstname.value + " " + lastname.value,
        email: email.value,
      });
      message.value = "Updated successfully";
      userInfo.loadUser();
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
  } else if (avatar.value.length <= 0) {
    message.value = "Please enter your avatar url";
  }
};
</script>
<template>
  <div class="mx-auto grid w-3/4 place-content-center gap-5">
    <div>
      <img
        :src="info?.avatar"
        class="mx-auto w-44 rounded-full p-2"
        :alt="`${info?.name}'s Avatar'`"
      />
    </div>
    <Username
      :default-firstname="firstname"
      :default-last-name="lastname"
      v-model:firstname="firstname"
      v-model:lastname="lastname"
    ></Username>
    <Password
      :default-password="info.password"
      v-model:password="password"
    ></Password>
    <Email :default-email="info.email" v-model:email="email"></Email>
    <Avatar :default-u-r-l="info.avatar" v-model:avatar-u-r-l="avatar"></Avatar>
    <p class="p-2 text-center text-sm text-purple-600">
      {{ message ? message : " " }}
    </p>
    <SignButton :text="'Update'" @click="submit"></SignButton>
  </div>
</template>
