import { defineStore } from "pinia";
import {Ref, ref} from "vue";
import {getRacesList} from "../http/api/ARaces.ts";
import {IRace} from "../utils/types/calculator-types.ts";

export const useRacesStore = defineStore('races', () => {
    const races: Ref<IRace[] | []> = ref([])
    const isLoading = ref(false)

    function requestRaceList() {
        isLoading.value = true;
        getRacesList().then((res) => {
            races.value = res
        })
            .finally(
                () => isLoading.value = false
            )
    }

    return {
        races,
        isLoading,
        requestRaceList
    }
})