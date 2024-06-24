<script setup lang="ts">

import PageTemplate from "./templates/PageTemplate.vue";
import Header from './components/Header.vue';
import {onMounted} from "vue";
import {startLoadingData} from "./services/start.service.ts";

onMounted(() => {
 startLoadingData();
})

</script>

<template>
  <PageTemplate>
    <template #header>
      <Header></Header>
    </template>
    <template #main>
      <router-view></router-view>
    </template>
    <template #footer></template>
  </PageTemplate>
</template>

<style scoped>
</style>
