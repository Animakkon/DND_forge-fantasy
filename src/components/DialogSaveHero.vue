<script setup lang="ts">
import {ref} from "vue";

const props = defineProps([
    'visible'
])

const emits = defineEmits([
    'cancel',
    'save'
])

const nameHero = ref('')

function cancelDialog() {
  emits('cancel')
}

function saveHero() {
  emits('save', nameHero.value)
  nameHero.value = ''
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="props.visible" header="Сохранить в историю" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Для сохранения расчитанных характеристик введите имя персонажа</span>
    <div class="flex items-center">
      <InputText v-model="nameHero"
                 id="personName"
                 class="flex-auto"
                 autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="cancelDialog()"></Button>
      <Button type="button" label="Save" @click="nameHero.length > 0 ? saveHero() : () => {}"></Button>
    </div>
  </Dialog>
  </div>
</template>

<style scoped>

</style>