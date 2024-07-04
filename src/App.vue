<script setup lang="ts">

import PageTemplate from "./templates/PageTemplate.vue";
import {onMounted} from "vue";
import {startLoadingData} from "./services/start.service.ts";

onMounted(() => {
 startLoadingData();
})

</script>

<template>
  <PageTemplate>
    <template #main>
      <router-view></router-view>
    </template>
    <template #footer></template>
  </PageTemplate>
</template>

<style scoped>
</style>
