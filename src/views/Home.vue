<script setup lang="ts">
import Filter from "../components/Items/Filter.vue";
import Slide from "../components/Slide/Slide.vue";
import FetchData from "../utils/fetchData";
import Item from "../components/Items/Item.vue";
import { computed, ref } from "vue";

let data = ref(await FetchData.getProducts());

const items = computed(() => data.value);
</script>
<template>
  <div
    id="carousel"
    class="row-start-2 grid border-b-4 border-b-green-600 pb-4"
  >
    <Slide class="col-start-1 my-auto"></Slide>
  </div>

  <div id="container" class="row-start-3">
    <div class="relative grid w-full gap-6">
      <Filter v-model="data"></Filter>
      <div
        id="list-container"
        class="grid auto-cols-fr auto-rows-[minmax(100px,290px)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
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
