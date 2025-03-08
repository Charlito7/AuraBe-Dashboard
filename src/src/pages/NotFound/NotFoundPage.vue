<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <router-link to="/" class="home-button">
      Go to Home
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

.home-button {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #42b983; /* Vue's default green color */
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #369f6e; /* Darker shade for hover effect */
}
</style>