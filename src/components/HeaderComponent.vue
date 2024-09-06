<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="navigation_buttons">
      <Button as="router-link" label="История" to="/history" link />
      <Button as="router-link"  label="Калькулятор" to="/" link />
    </div>
  </div>
</template>

<style>
.container {
  border-bottom: 1px solid var(--p-button-link-color);
  width: 100%;
  height: 5%;
  max-height: 60px;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
}

.navigation_buttons {
  display: flex;
  flex-direction: row-reverse;
  text-decoration: none;
}

:root {
  .p-button-link {
    text-decoration: none;
  }
}
</style>