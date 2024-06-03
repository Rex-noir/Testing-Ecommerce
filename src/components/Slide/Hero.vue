<script setup lang="ts">
const slideUP = () => {
  const targetElement = document.querySelector("#list-container");

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scroll({ top: 0, behavior: "smooth" });
  }
};
</script>
<template>
  <div class="grid w-full gap-5 md:grid-cols-2">
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
      class="row-start-2 hidden rounded-lg shadow-lg shadow-slate-300 hover:shadow-slate-400 md:col-start-2 md:row-start-1 md:grid"
    >
      <div
        class="relative col-start-2 row-span-2 row-start-1 h-full p-3 text-center"
      >
        <img
          src="../../assets/undraw_transfer_money_re_6o1h.svg"
          class="mx-auto h-full w-5/6 p-5"
          alt="hero image"
        />
        <span class="absolute bottom-3 left-0 w-full"
          >No need to worry about paymet methods!</span
        >
      </div>
    </div>
  </div>
</template>
