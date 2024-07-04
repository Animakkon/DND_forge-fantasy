import {useRacesStore} from "../pinia/StoreRaces.ts";

export function getStoreRacesList() {
    return useRacesStore().races
}
export function checkIsLoadingStoreRacesList() {
    return useRacesStore().isLoading
}