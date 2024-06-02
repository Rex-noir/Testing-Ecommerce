<script setup lang="ts">
import { onMounted } from "vue";

const avatarURL = defineModel("avatarURL");
const props = defineProps(["defaultURL"]);

onMounted(() => {
  const input = document.querySelector("#avatar") as HTMLInputElement;

  if (props.defaultURL) {
    input.value = props.defaultURL;
  } else {
    input.value = "https://api.dicebear.com/8.x/bottts/svg";
  }
});

avatarURL.value = "https://api.dicebear.com/8.x/bottts/svg";
const updateModel = (e: Event) => {
  const input = e.target as HTMLInputElement;
  avatarURL.value = input.value;
};
</script>
<template>
  <div>
    <label for="avatar">Avatar URL</label>
    <input
      type="url"
      name="avatar"
      @input="updateModel"
      id="avatar"
      class="w-full rounded-sm border-2 border-slate-900 p-2 shadow transition-all focus-within:shadow-lg focus-within:outline-none"
    />
  </div>
</template>
