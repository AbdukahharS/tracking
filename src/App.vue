<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div class="app-container">
    <SideBar />
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<style>
@import "./App.css";
</style>
