import {useRacesStore} from "../pinia/StoreRaces.ts";

// сервис для загрузки данных по сторам при загрузке приложения

export function startLoadingData() {
    useRacesStore().requestRaceList()
}