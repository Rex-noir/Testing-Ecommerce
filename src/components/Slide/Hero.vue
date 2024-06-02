<script setup lang="ts"></script>
<template>
  <div>
    <div
      class="mx-auto flex h-[300px] w-full justify-center md:h-[550px] md:w-5/6"
    >
      <picture>
        <source
          srcset="../../assets/hero_image_640.jpg"
          media="(max-width: 640px)"
        />
        <source
          srcset="../../assets/hero_image_1920.jpg"
          media="(max-width: 1920px)"
        />
        <img
          src="../../assets/hero_image_2400.jpg"
          alt="Image description"
          class="max-h-full w-full rounded-lg"
        />
      </picture>
    </div>
  </div>
</template>
