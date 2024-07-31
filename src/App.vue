<script setup lang="ts">

import PageTemplate from "./templates/PageTemplate.vue";
import {onMounted} from "vue";
import {startLoadingData} from "./services/start.service.ts";
import {bodyResizeObserver} from "@/services/sizeObserwer.service.ts";

let resize = new ResizeObserver((entires: ResizeObserverEntry[]) => {
  bodyResizeObserver(entires)
}).observe(document.body);

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
