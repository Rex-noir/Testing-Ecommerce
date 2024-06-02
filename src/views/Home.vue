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
    <div id="carousel" class="row-start-1 w-full p-3">
      <Hero class="my-auto"></Hero>
    </div>
    <div id="container" class="row-start-2">
      <Filter v-model="data"></Filter>
      <div
        id="list-container"
        class="grid auto-cols-fr auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        v-if="items"
      >
        <Item v-for="item in items.json" :data="item" :key="item.id"></Item>
      </div>
    </div>
    <p v-show="items.json.length <= 0" class="text-center text-slate-500">
      Empty list!
    </p>
  </div>
</template>
