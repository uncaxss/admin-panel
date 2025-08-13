<template>
  <div class="h-screen grid grid-cols-4 grid-rows-3 gap-4">
    <!-- Меню -->
    <MenuPanel />

    <!-- Основной контент -->
    <div class="col-span-3 row-span-3 p-4 bg-white ">
      <slot />
    </div>
  </div>
</template>

<script setup>
import MenuPanel from './menuPanel.vue'


</script>