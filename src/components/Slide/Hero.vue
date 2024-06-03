<script setup lang="ts">
import { onMounted, ref } from "vue";
import savingIMG from "../../assets/undraw_savings_re_eq4w.svg";
import transferIMG from "../../assets/undraw_transfer_money_re_6o1h.svg";
import shopoingIMG from "../../assets/undraw_web_shopping_re_owap.svg";

const slideUP = () => {
  const targetElement = document.querySelector("#list-container");

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scroll({ top: 0, behavior: "smooth" });
  }
};

const images: { src: string; text: string }[] = [
  { src: savingIMG, text: "Buy more and save more!" },
  { src: transferIMG, text: "No need to worry about payment method!" },
  { src: shopoingIMG, text: "Shop directly! No signup required!" },
];
const currentIndex = ref<number>(0);

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 2000);
});
</script>
<template>
  <div class="grid w-full grid-rows-2 gap-5 md:grid-cols-2 md:grid-rows-1">
    <div>
      <div
        class="row-start-1 my-auto flex h-full flex-col justify-center gap-6 rounded-lg p-1 md:p-5"
      >
        <span class="w-fit rounded-full bg-amber-200 p-2"
          >#1 Your trusted ecommerce</span
        >
        <h1 class="text-6xl">E-Commerce</h1>
        <p class="p-2 text-justify text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nemo
          esse repudiandae, dolores laborum, corrupti deserunt consectetur
          perferendis incidunt hic facilis cumque distinctio eligendi
          exercitationem cum libero? Perspiciatis, blanditiis sint.
        </p>
        <div class="flex gap-3 p-2">
          <button
            class="rounded-xl bg-red-600 p-2 text-white shadow-md shadow-slate-600 transition-all duration-200 hover:scale-95 hover:bg-slate-800 active:scale-105"
          >
            Sell your products
          </button>
          <button
            @click="slideUP"
            class="rounded-xl border-2 border-slate-900 p-2 transition-all duration-200 hover:scale-95 hover:bg-slate-800 hover:text-white active:scale-105"
          >
            Explore now!
          </button>
        </div>
      </div>
    </div>
    <div
      class="relative row-start-2 mx-auto my-auto h-[350px] w-3/4 rounded-lg p-1 text-center shadow-lg shadow-slate-300 hover:shadow-slate-400 md:col-start-2 md:row-start-1"
    >
      <Transition enter-active-class="scale-0" leave-active-class="scale-0">
        <img
          :src="images[currentIndex].src"
          :key="currentIndex"
          class="duration-2000 absolute size-80 w-full p-10 transition-all ease-in-out"
          alt="hero image"
        />
      </Transition>
      <span
        class="duration-2000 absolute bottom-3 left-0 w-full transition-all"
        >{{ images[currentIndex].text }}</span
      >
    </div>
  </div>
</template>
