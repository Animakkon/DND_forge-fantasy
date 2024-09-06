<script setup lang="ts">

 // принимает список компонентов
 // преобразовывает для отображения
 // содержит кнопку перехода на историю в принципе

 import {getHeroesList} from "@/services/heroesHistory.services.ts";
 import {computed, watch} from "vue";
 import HeroItem from "@/components/HeroItem.vue";

 const listToShow = computed(() => getHeroesList())

 watch(listToShow, (value: boolean) => {
   console.log('list changed')
 })

</script>

<template>
  <div v-for="i of listToShow" class="flexible">
    {{i.nameHero}}
    <HeroItem></HeroItem>
  </div>
</template>

<style scoped>
.flexible {
  display: flex;
}

</style>