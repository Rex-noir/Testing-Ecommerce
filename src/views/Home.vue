<script setup lang="ts">
import Filter from "../components/Items/Filter.vue";
import FetchData from "../utils/fetchData";
import Item from "../components/Items/Item.vue";
import { computed, ref } from "vue";
import Hero from "../components/Slide/Hero.vue";

let data = ref(await FetchData.getProducts());

const items = computed(() => data.value);
</script>
<template>
  <div class="grid auto-rows-auto gap-6">
    <div id="carousel" class="row-start-1 w-full">
      <Hero class="my-auto"></Hero>
    </div>
    <div id="container" class="row-start-2 flex flex-col gap-3 rounded-lg">
      <Filter v-model="data"></Filter>
      <div
        id="list-container"
        class="relative grid auto-rows-fr grid-cols-[repeat(auto-fill,_300px)] place-content-center items-center gap-5 rounded-lg bg-gray-200 py-10 shadow-lg"
        v-if="items"
      >
        <Item v-for="item in items.json" :data="item" :key="item.id"></Item>
        <p
          v-show="items.json.length <= 0"
          class="absolute w-full text-center text-slate-500"
        >
          Empty list!
        </p>
      </div>
    </div>
  </div>
</template>
