import {WindowSize} from "../utils/enums/calculator-enums.ts";
import {RowsNames} from "../utils/constants/tables-names.ts";
import {useTableHeadersByWindowSize} from "../pinia/StoreTableHeadersByWindowSize.ts";
import {ref} from "vue";


function getStoreSizeBuilder() {
    return useTableHeadersByWindowSize()
}

export function getTableColumnsName(): string {
    return getStoreSizeBuilder().tableHeaders;
}

let _rowsNamesToShow = [];
export function rowsNames() {
    debugger
    return _rowsNamesToShow;
}
// todo: в стор? или из стора чисто сюда
export function getTableRowsName(windowSize = getStoreSizeBuilder().windowSizeType) {
    switch(windowSize){
        case WindowSize.Normal:
        case WindowSize.Large:
            return RowsNames;
        default:
            return undefined;
    }
}

export function hasTableHeader(windowSize = getStoreSizeBuilder().windowSizeType) {
    console.log('winSize', windowSize)
    switch(windowSize){
        case WindowSize.Small:
        case WindowSize.Medium:
            return false;
        default:
            return true;
    }
}

export function setWindowSize(size: number) {
    getStoreSizeBuilder().setNewSize(size)
}

export function getWindowSize(windowSize = getStoreSizeBuilder().windowSizeType) {
    return windowSize;
}
