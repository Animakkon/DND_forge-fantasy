<script setup lang="ts">

import {getHeroesList} from "../services/heroesHistory.services.ts";
</script>

<template>
  This Is History
  {{getHeroesList()}}
</template>

<style scoped>

</style>