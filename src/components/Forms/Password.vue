<script setup lang="ts">
import { onMounted, ref } from "vue";
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility_off.svg";

const imgSrc = ref(visibility);
const password = defineModel<string>("password");
const props = defineProps(["defaultPassword"]);
const error = ref<boolean>(false);

onMounted(() => {
  if (props.defaultPassword) {
    const input = document.querySelector("#password-input") as HTMLInputElement;
    input.value = props.defaultPassword;
  }
});

const toggleVisibility = () => {
  const input = document.querySelector("#password-input") as HTMLInputElement;
  if (imgSrc.value === visibility) {
    imgSrc.value = visibilityOff;
    input.type = "text";
  } else {
    imgSrc.value = visibility;
    input.type = "password";
  }
};
const updateModel = (e: Event) => {
  const input = e.target as HTMLInputElement;
  password.value = input.value;
  if (input.value.length >= 1 && input.value.length < 8) {
    error.value = true;
  } else {
    error.value = false;
  }
};
</script>
<template>
  <div>
    <label for="password-input" class="block">Password</label>
    <div class="relative flex">
      <input
        type="password"
        name="password"
        required
        @input="updateModel"
        id="password-input"
        :class="{ 'border-red-600': error, ' border-slate-900 ': !error }"
        class="w-full rounded-sm border-2 border-slate-900 p-2 pr-8 shadow focus-within:outline-none"
      />
      <img
        :src="imgSrc"
        alt="visibility"
        class="absolute right-2 top-1/2 -translate-y-1/2 transform"
        @click="toggleVisibility"
      />
    </div>
  </div>
</template>
