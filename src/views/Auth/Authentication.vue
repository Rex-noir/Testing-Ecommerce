<script setup lang="ts">
import { useRoute } from "vue-router";
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";
const route = useRoute();
</script>
<template>
  <template v-if="route.params.type === 'login'"> <Signin></Signin></template>
  <template v-if="route.params.type === 'signup'"><Signup></Signup></template>
</template>
