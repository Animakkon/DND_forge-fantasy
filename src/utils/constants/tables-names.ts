import {RussianShortStateNames, RussianStateNames, StateNames, TableRowsNames} from "../enums/calculator-enums.ts";
import {TABLE_ROW_HEADER} from "../mock/calculator_mocks.ts";

//      COLUMNS NAMES
export const NormalSizeScreenTableNames = [
    { field: "name", header: TABLE_ROW_HEADER.columnHead },
    { field: StateNames.WISDOM, header: RussianStateNames.WISDOM },
    { field: StateNames.CHARISMA, header: RussianStateNames.CHARISMA },
    { field: StateNames.PHYSIQUE, header: RussianStateNames.PHYSIQUE },
    { field: StateNames.STRENGTH, header: RussianStateNames.STRENGTH },
    { field: StateNames.AGILITY, header: RussianStateNames.AGILITY },
    { field: StateNames.INTELLIGENCE, header: RussianStateNames.INTELLIGENCE },
]

export const MediumSizeScreenTableNames = [
    { field: StateNames.WISDOM, header: RussianStateNames.WISDOM },
    { field: StateNames.CHARISMA, header: RussianStateNames.CHARISMA },
    { field: StateNames.PHYSIQUE, header: RussianStateNames.PHYSIQUE },
    { field: StateNames.STRENGTH, header: RussianStateNames.STRENGTH },
    { field: StateNames.AGILITY, header: RussianStateNames.AGILITY },
    { field: StateNames.INTELLIGENCE, header: RussianStateNames.INTELLIGENCE },
]

export const SmallSizeScreenTableNames = [
    { field: StateNames.WISDOM, header: RussianShortStateNames.WISDOM },
    { field: StateNames.CHARISMA, header: RussianShortStateNames.CHARISMA },
    { field: StateNames.PHYSIQUE, header: RussianShortStateNames.PHYSIQUE },
    { field: StateNames.STRENGTH, header: RussianShortStateNames.STRENGTH },
    { field: StateNames.AGILITY, header: RussianShortStateNames.AGILITY },
    { field: StateNames.INTELLIGENCE, header: RussianShortStateNames.INTELLIGENCE },
]

//      ROWS NAMES
export const RowsNames = [
    { field: 'modificator', header: TableRowsNames.MODIFICATOR },
    { field: 'raceBonus', header: TableRowsNames.RACE_BONUS },
    { field: 'totalCounts', header: TableRowsNames.TOTAL_COUNTS },
]
