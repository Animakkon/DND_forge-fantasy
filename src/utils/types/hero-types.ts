import {IRace, IRaceState} from "./calculator-types.ts";

export interface ISavedHeroTypes {
    nameHero: string,
    chosenRaceId: string,
    dataToShow: {
        raceInfo: IRace,
        totals: IRaceState,
        userItems: IRaceState
    }
}