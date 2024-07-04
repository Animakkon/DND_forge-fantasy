<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import {checkIsLoadingStoreRacesList, getStoreRacesList} from "../services/races.service.ts";
import {DEFAULT_STATES, NULLABLE_STATES, TABLE_ROW_HEADER} from "../utils/mock/calculator_mocks.ts";
import {RussianStateNames, StateNames, TableRowsNames} from "../utils/enums/calculator-enums.ts";
import {
  DIFFERENCE_BETWEEN_USED_COUNTS,
  MAX_DISTRRIBUTION_POINTS, MAX_STATE_VALUE,
  NULL_STATE_VALUE
} from "../utils/constants/calculator-constants.ts";

//________RACE_LIST WITH LOADING___
const raceList = computed(() => getStoreRacesList() )
const loading = computed(() => checkIsLoadingStoreRacesList() )

const selectedRace = ref({})
const selectedSubrace = ref({})
watch([selectedRace, selectedSubrace], ([count1, prevCount1], [count2, prevCount2]) => {
  let changed = null;
  if (count1?.id !== count2?.id) {
    changed = count1.state
  } else if (prevCount1.id !== prevCount2.id) {
    changed = prevCount1.state
  }

  if (changed) {
    setRaceOrSubraceBonusBySelectInput(changed)
  } else {
    resetRowRaceBonusToDefault()
  }
})

//________TABLE CELLS VALUES___
const _editableRowIndex = 0;
const _raceBonusRowIndex = 1;

const stateKeys = Object.keys({...NULLABLE_STATES})

const tableRows = reactive([
  {...DEFAULT_STATES},
  { ...NULLABLE_STATES }
])

const totalsRow = reactive({ ...NULLABLE_STATES })
watch(tableRows, () => {})

//________TABLE_ROWS VALUES BY SELECT CHANGE___
function setRaceOrSubraceBonusBySelectInput(value) {
  const defaultTable = {...NULLABLE_STATES}
  const keys = stateKeys;

  console.log(value)

  keys.forEach((key: string) => {
    if (value.hasOwnProperty(key)) {
      defaultTable[key] = value[key]
    } else {
      defaultTable[key] = NULL_STATE_VALUE
    }
  })

  tableRows[_raceBonusRowIndex] = defaultTable
}
function resetRowRaceBonusToDefault() {
  tableRows[_raceBonusRowIndex] = {...NULLABLE_STATES}
}

//________HEADER ROW AND COLUMN________________
const columnsNamesToDisplay = [
    { field: "name", header: TABLE_ROW_HEADER.columnHead },
    { field: StateNames.WISDOM, header: RussianStateNames.WISDOM },
    { field: StateNames.CHARISMA, header: RussianStateNames.CHARISMA },
    { field: StateNames.PHYSIQUE, header: RussianStateNames.PHYSIQUE },
    { field: StateNames.STRENGTH, header: RussianStateNames.STRENGTH },
    { field: StateNames.AGILITY, header: RussianStateNames.AGILITY },
    { field: StateNames.INTELLIGENCE, header: RussianStateNames.INTELLIGENCE },
]
const rowsNamesToDisplay = [
  { field: 'modificator', header: TableRowsNames.MODIFICATOR },
  { field: 'raceBonus', header: TableRowsNames.RACE_BONUS },
  { field: 'totalCounts', header: TableRowsNames.TOTAL_COUNTS },
]

//________POINTS TO USE________________
const totalPointsToUse = ref(MAX_DISTRRIBUTION_POINTS)
const calculatedTotalCounts = reactive({...DEFAULT_STATES})

watch(tableRows, (count) => {
  let usableCounts = 0;
  stateKeys.forEach(key => {
    usableCounts+= count[0][key]

    calculatedTotalCounts[key] = count[0][key] + count[1][key]
  })

  totalPointsToUse.value = -1 * usableCounts + DIFFERENCE_BETWEEN_USED_COUNTS;
})

</script>

<template>
  <Select v-model:="selectedRace"
          :options="raceList"
          :disabled="!raceList.length && !loading || false"
          optionLabel="name"
          placeholder="Выберите расу"
          :loading="loading"
          filter
  ></Select>
  <Select v-model:="selectedSubrace"
          :options="selectedRace.child"
          :disabled="!selectedRace?.child?.length || false"
          optionLabel="name"
          placeholder="Выберите подрасу"
          filter
  ></Select>
  <Message severity="warn">{{ totalPointsToUse }} / {{ MAX_DISTRRIBUTION_POINTS }}</Message>

  <DataTable :value="tableRows">
    <Column v-for="(col, columnIndex) of columnsNamesToDisplay"
            :key="columnIndex"
            :field="col.field"
            :header="col.header"
            class="column"
    >
      <template #body="slotProps">
        <div v-if="columnIndex === 0">
          {{ rowsNamesToDisplay[slotProps.index].header}}
        </div>
        <div v-else>
          <div v-if="slotProps.index === _editableRowIndex">
            <InputNumber v-model="slotProps.data[col.field]"
                         inputId="minmax-buttons"
                         showButtons
                         buttonLayout="horizontal"
                         :min="-5"
                         :max="totalPointsToUse <= 0 ? slotProps.data[col.field] : MAX_STATE_VALUE"
                         :step="1"
                         >
            </InputNumber>
          </div>
          <div v-else>{{ slotProps.data[col.field] === 0 ? '-' : slotProps.data[col.field] }}</div>
        </div>
      </template>
      <template #footer>
        <div v-if="columnIndex === 0"> ИТОГО</div>
        <div v-else> {{calculatedTotalCounts[col.field]}}</div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
</style>
