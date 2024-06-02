<script setup lang="ts">
import { onMounted } from "vue";

const firstname = defineModel("firstname");
const lastname = defineModel("lastname");

const props = defineProps(["defaultFirstname", "defaultLastName"]);

onMounted(() => {
  const firstname = document.querySelector("#firstname") as HTMLInputElement;
  const lastname = document.querySelector("#lastname") as HTMLInputElement;
  if (props.defaultFirstname && props.defaultLastName) {
    firstname.value = props.defaultFirstname;
    lastname.value = props.defaultLastName;
  }
});

const updateModels = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.name === "firstname") {
    firstname.value = input.value;
  }
  if (input.name === "lastname") {
    lastname.value = input.value;
  }
};
</script>
<template>
  <div class="grid w-full grid-cols-12">
    <div class="col-span-5 col-start-1">
      <label for="firstname" class="w-full">First Name</label>
      <input
        type="text"
        name="firstname"
        placeholder="John"
        @input="updateModels"
        class="w-full rounded-sm border-2 border-slate-900 p-2 focus-within:outline-none"
        id="firstname"
      />
    </div>
    <div class="col-span-12 col-start-7">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        placeholder="Doe"
        name="lastname"
        id="lastname"
        @input="updateModels"
        class="w-full rounded-sm border-2 border-slate-900 p-2 focus-within:outline-none"
      />
    </div>
  </div>
</template>
