import {IRaceState} from '../types/calculator-types.ts';
import {DEFAULT_STATE_VALUE, NULL_STATE_VALUE} from '../constants/calculator-constants.ts';
import {TableRowsNames} from "../enums/calculator-enums.ts";

export const DEFAULT_STATES: IRaceState | {[k: string]: string}  = {
        strength: DEFAULT_STATE_VALUE,
        agility: DEFAULT_STATE_VALUE,
        physique: DEFAULT_STATE_VALUE,
        intelligence: DEFAULT_STATE_VALUE,
        wisdom: DEFAULT_STATE_VALUE,
        charisma: DEFAULT_STATE_VALUE,
}

export const NULLABLE_STATES: IRaceState  = {
        strength: NULL_STATE_VALUE,
        agility: NULL_STATE_VALUE,
        physique: NULL_STATE_VALUE,
        intelligence: NULL_STATE_VALUE,
        wisdom: NULL_STATE_VALUE,
        charisma: NULL_STATE_VALUE,
}

export const TABLE_ROW_HEADER = {
       columnHead: TableRowsNames.HEADER,
       raceBonus: TableRowsNames.RACE_BONUS,
       modificator: TableRowsNames.MODIFICATOR,
       totals: TableRowsNames.TOTAL_COUNTS,
}
