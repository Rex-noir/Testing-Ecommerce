<script setup lang="ts"></script>
<template>
  <div class="grid w-full grid-cols-2 gap-5">
    <div>
      <div
        class="flex flex-col gap-6 rounded-lg p-5 shadow-lg shadow-slate-300 hover:shadow-slate-400"
      >
        <span class="w-fit rounded-full bg-amber-200 p-2"
          >#1 Your trusted ecommerce</span
        >
        <h1 class="text-7xl">E-Commerce</h1>
        <p class="p-2 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nemo
          esse repudiandae, dolores laborum, corrupti deserunt consectetur
          perferendis incidunt hic facilis cumque distinctio eligendi
          exercitationem cum libero? Perspiciatis, blanditiis sint.
        </p>
        <div class="flex gap-3 p-2">
          <button
            class="rounded-xl bg-red-600 p-2 text-white shadow-md shadow-slate-600 hover:bg-slate-800"
          >
            Sell your products
          </button>
          <button
            class="rounded-xl border-2 border-slate-900 p-2 hover:bg-slate-800 hover:text-white"
          >
            Explore now!
          </button>
        </div>
        <div>
          <p class="text-sm">
            <span class="rounded-full text-green-500">&#10003;</span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <p class="text-sm">
            <span class="rounded-full text-green-500">&#10003;</span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>
        <div class="mb-auto flex items-center gap-3">
          <span
            class="rounded-full border-2 border-slate-900 bg-emerald-400 px-2"
            >Fast</span
          >
          <span class="rounded-full border-2 border-slate-900 bg-amber-200 px-2"
            >Secure</span
          >
          <span
            class="rounded-full border-2 border-slate-900 bg-slate-900 px-2 text-white"
            >No Fee</span
          >
          <span
            class="rounded-full border-2 border-slate-900 bg-sky-600 px-2 text-white"
            >International</span
          >
        </div>
      </div>
    </div>
    <div
      class="col-start-2 grid grid-cols-2 grid-rows-2 rounded-lg shadow-lg shadow-slate-300 hover:shadow-slate-400"
    >
      <div class="col-start-1 row-start-1 place-content-center p-3 text-center">
        <img
          src="../../assets/undraw_web_shopping_re_owap.svg"
          class="mx-auto w-5/6"
          alt="hero image"
        />
        <span class="text-sm">Just SHOP! No Signup required</span>
      </div>
      <div class="col-start-1 row-start-2 p-3 text-center">
        <img
          src="../../assets/undraw_savings_re_eq4w.svg"
          class="mx-auto w-5/6"
          alt="hero image"
        />
        <span class="text-sm">Buy more and save more!</span>
      </div>
      <div class="col-start-2 row-span-2 row-start-1 h-full p-3 text-center">
        <img
          src="../../assets/undraw_transfer_money_re_6o1h.svg"
          class="mx-auto h-5/6 w-5/6"
          alt="hero image"
        />
        <span class="text-sm">No need to worry about paymet methods!</span>
      </div>
    </div>
  </div>
</template>
