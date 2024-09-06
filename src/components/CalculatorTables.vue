<script setup lang="ts">
import {ALLOW_MAX_STATE_VALUE, ALLOW_MIN_STATE_VALUE, MAX_STATE_VALUE} from "@/utils/constants/calculator-constants.ts";

const props = defineProps([
    'editable',
    'totalsPointsToUse' // hasPointsToReplace?

])
</script>

<template>
  <DataTable :value="tableRows"
             :size="'small'"
             :showGridlines="false"
             columnResizeMode="fit"
  >
    <Column v-for="(col, columnIndex) of columnsNamesToDisplay"
            :key="columnIndex"
            :field="col.field"
            :header="col.header"
            class="column"
    >
      <template #body="slotProps">
        <div v-if="hasHeaders">
          <div v-if="columnIndex === 0">
            {{ rowsNamesToDisplay[slotProps.index].header }}
          </div>
        </div>
        <div>
          <div v-if="(!hasHeaders || columnIndex !== 0) && slotProps.index === _editableRowIndex">
            <InputNumber v-model="slotProps.data[col.field]"
                         inputId="minmax-buttons"
                         :min="ALLOW_MIN_STATE_VALUE"
                         :max="totalPointsToUse <= 0 && calculatedTotalCounts[col.field] <= ALLOW_MAX_STATE_VALUE ?
                              slotProps.data[col.field] :
                              MAX_STATE_VALUE"
                         :step="1"
                         :inputClass="'inputClass'"
                         :buttonLayout="hasHeaders ? 'horizontal' : 'vertical'"
                         showButtons
            >
              <!--- ButtonLayout вычисляемый--->
            </InputNumber>
          </div>
          <div v-else
               class="text-center"
          >{{ slotProps.data[col.field] === 0 ? '-' : slotProps.data[col.field] }}</div>
        </div>
      </template>
      <template #footer>
        <div v-if="hasHeaders">
          <div v-if="columnIndex === 0"> ИТОГО</div>
        </div>
        <div> {{ calculatedTotalCounts[col.field] }}</div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>