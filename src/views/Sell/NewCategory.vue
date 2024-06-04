<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { createCategory } from "../../utils/auth";
const dialog = ref<HTMLDialogElement | null>(null);
const isShown = ref<boolean>(false);
const emit = defineEmits(["update"]);

const toggleDialog = () => {
  if (isShown.value === false) {
    dialog.value?.showModal();
    isShown.value = true;
  } else {
    dialog.value?.close();
    isShown.value = false;
  }
};

const title = ref<string>("");
const imageURL = ref<string>("");
const status = ref<string>("");
const urlRegex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

const create = async () => {
  if (title.value?.length <= 0) {
    status.value = "Please enter the title";
  } else if (imageURL.value?.length <= 0) {
    status.value = "Please enter the image URL";
  } else if (!urlRegex.test(imageURL.value as string)) {
    status.value = "Please enter a valid image URL";
  } else {
    try {
      status.value = "Creating....";
      await createCategory({
        name: title.value as string,
        image: imageURL.value as string,
      });
      status.value = "Done";
      toggleDialog();
      emit("update");
    } catch (error) {
      status.value = "An Error Occurred";
    }
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isShown.value) {
    toggleDialog();
  }
};

onMounted(() => {
  dialog.value = document.querySelector(
    "dialog#categories",
  ) as HTMLDialogElement;

  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>
<template>
  <button
    @click="toggleDialog"
    class="ho ml-2 mt-2 border-2 border-stone-500 p-1 px-2 hover:bg-slate-800 hover:text-white"
  >
    +
  </button>
  <dialog id="categories" class="rounded-lg p-3 backdrop:backdrop-blur-sm">
    <div class="grid size-full place-content-center place-items-center gap-3">
      <h2>Create new Category</h2>
      <input
        placeholder="Category title"
        type="text"
        id="title"
        v-model="title"
        class="rounded-lg border-2 border-stone-500 p-2 focus-within:outline-none"
      />
      <input
        placeholder="Category image URL"
        type="url"
        title="image"
        v-model="imageURL"
        class="rounded-lg border-2 border-stone-500 p-2 focus-within:outline-none"
      />
      <p class="text-sm text-purple-900">
        {{ status.length === 0 ? " " : status }}
      </p>
      <button
        @click="create"
        class="rounded-lg border-2 border-stone-500 p-2 hover:bg-slate-900 hover:text-white"
      >
        Create
      </button>
    </div>
  </dialog>
</template>
