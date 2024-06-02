<script setup lang="ts">
import { onMounted, ref } from "vue";
import { validateEmail } from "../../utils/validator";

const error = ref<boolean>(false);
const email = defineModel<string>("email");
const prop = defineProps(["defaultEmail"]);

onMounted(() => {
  const input = document.querySelector("#email") as HTMLInputElement;
  if (prop.defaultEmail) {
    input.value = prop.defaultEmail;
  }
});
const checkErr = (event: Event) => {
  const input = event.target as HTMLInputElement;
  email.value = input.value;
  if (validateEmail(input.value) || input.value.length <= 0) {
    error.value = false;
  } else {
    error.value = true;
  }
};

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus(),
};
</script>

<template>
  <div>
    <label for="email" class="block">Email</label>
    <input
      type="email"
      name="email"
      required
      id="email"
      placeholder="johndoe@email.com"
      v-focus
      @input="checkErr"
      :class="{ 'border-red-600': error }"
      class="w-full rounded-sm border-2 border-slate-900 p-2 shadow transition-all focus-within:shadow-lg focus-within:outline-none"
    />
  </div>
</template>
