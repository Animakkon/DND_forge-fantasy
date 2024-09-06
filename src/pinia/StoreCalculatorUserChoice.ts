import {Ref, ref} from "vue";
import {DEFAULT_STATES, NULLABLE_STATES} from "../utils/mock/calculator_mocks.ts";
import {IRaceState} from "../utils/types/calculator-types.ts";
import {defineStore} from "pinia";

export const useCalculatorUserChoice = defineStore('calculatorUserChoice',() => {
    const changedCountsRow: Ref<IRaceState> = ref(DEFAULT_STATES);
    const raceBonusRow: Ref<IRaceState> = ref(NULLABLE_STATES);

    const totalCountsToReplace = ref(15);

    // reset states
    // set states


    return {
        changedCountsRow,
        raceBonusRow,
        totalCountsToReplace,
    }
})