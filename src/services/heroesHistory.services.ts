import {useHeroesHistoryList} from "../pinia/StoreHeroesHistoryList.ts";
import {IRace, IRaceState} from "../utils/types/calculator-types.ts";


function _getHeroHistoryStore() {
    return useHeroesHistoryList()
}

export function setHeroToHistory(
    nameHero: string,
    raceInfo: IRace,
    chosenRaceId: string,
    totals: IRaceState,
    userItems: IRaceState,
) {
    const dto = {
        nameHero,
        chosenRaceId,
        dataToShow: {
            raceInfo,
            totals,
            userItems
        }

    }
    _getHeroHistoryStore().pushHero(dto)
}

export function getHeroesList() {
    return _getHeroHistoryStore().heroesList
}

