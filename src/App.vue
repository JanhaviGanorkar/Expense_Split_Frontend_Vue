<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue';

</script>

<template>
  <div id="app">
    <!-- Navbar Component -->
    <Navbar />
    
    <main class="main-content">
      <RouterView />
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  background-color: #1a1a1a;
  color: #e5e5e5;
}

#app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  color: #e5e5e5;
}

.main-content {
  flex: 1;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #1a1a1a;
}
</style>
