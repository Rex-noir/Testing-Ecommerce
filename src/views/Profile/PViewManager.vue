<script setup lang="ts">
import { useRoute } from "vue-router";
import Me from "./Me.vue";
const route = useRoute();
</script>
<template>
  <template v-if="route.params.id === 'me'"><Me></Me></template>
</template>
