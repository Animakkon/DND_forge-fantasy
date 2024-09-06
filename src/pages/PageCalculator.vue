<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import {checkIsLoadingStoreRacesList, getStoreRacesList} from "../services/races.service.ts";
import {DEFAULT_STATES, NULLABLE_STATES} from "../utils/mock/calculator_mocks.ts";
import {
  ALLOW_MAX_STATE_VALUE,
  ALLOW_MIN_STATE_VALUE,
  DIFFERENCE_BETWEEN_USED_COUNTS,
  MAX_DISTRRIBUTION_POINTS, MAX_STATE_VALUE,
  NULL_STATE_VALUE
} from "../utils/constants/calculator-constants.ts";
import {getTableColumnsName, getTableRowsName, hasTableHeader} from "@/pages/calculateTableBuilder.ts";
import {setHeroToHistory} from "@/services/heroesHistory.services.ts";
import DialogSaveHero from "@/components/DialogSaveHero.vue";
import HeroItemsList from "@/components/HeroItemsList.vue";

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
  { ...DEFAULT_STATES },
  { ...NULLABLE_STATES }
])

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
const columnsNamesToDisplay = computed(() => getTableColumnsName())

const rowsNamesToDisplay = computed(() => getTableRowsName())

const hasHeaders = computed(() => hasTableHeader())

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

// Buttons
function resetValues() {
  selectedRace.value = {}

  tableRows[_editableRowIndex] = {...DEFAULT_STATES}
}

const canToSaveCurrent = computed(
    () => Object.keys(selectedRace.value).length > 0 ||
        Object.keys(selectedSubrace.value).length > 0
)

function saveHeroToHistory(heroName: string) {
  const raceIdToSave = selectedSubrace.value.id ?? selectedRace.value.id

  setHeroToHistory(
      heroName,
      selectedRace,
      raceIdToSave,
      calculatedTotalCounts,
      tableRows[_editableRowIndex],
  )

  visibility.value = false
}

const visibility = ref(false)


</script>

<template>
  <article class="flexible user_panel">
    <div>
      <Select v-model:="selectedRace"
              :options="raceList"
              :disabled="!raceList.length && !loading || false"
              :loading="loading"
              optionLabel="name"
              placeholder="Выберите расу"
              fluid
              filter
      ></Select>
      <Select v-model:="selectedSubrace"
              :options="selectedRace.child"
              :disabled="!selectedRace?.child?.length || false"
              optionLabel="name"
              placeholder="Выберите подрасу"
              fluid
              filter
      ></Select>
    </div>

    <div class="flexible">
      <Button icon="pi pi-times-circle"
              aria-label="Clear"
              style="font-size: 2rem"
              @click="resetValues()"
      />
      <Button icon="pi pi-save"
              aria-label="Save current"
              style="font-size: 2rem"
              @click="visibility = true"
              :disabled="!canToSaveCurrent"
      />
    </div>
  </article>

  <article>
    <Message severity="warn">Очки для распределения: {{ totalPointsToUse }} / {{ MAX_DISTRRIBUTION_POINTS }}</Message>
  </article>

  <article>
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
  </article>

  <DialogSaveHero :visible="visibility"
                  @cancel="visibility = false"
                  @save="(heroName) => saveHeroToHistory(heroName)"
  ></DialogSaveHero>
</template>

<style>
  .flexible {
    display: flex;
  }

  .user_panel {
    justify-content: space-between;

    align-items: center;
  }

  article {
    margin-bottom: 1rem;
  }

  .column {
    max-width: 50px;
  }

  .inputClass {
    width: 100%;
  }
</style>

<!-- small - до 400: buttons padding 0, horisontal
.p-datatable-tbody > tr > td text-align: center + выровнять хэдер и футер

перейти в историю, показать историю последних

табллица - отдельный компонент, который изменяется или может отображать информацию
-->


<!--small - в строку
medium - в строку

large поближе друг к другу-->