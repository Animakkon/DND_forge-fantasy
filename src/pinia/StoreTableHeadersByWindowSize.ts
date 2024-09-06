import {defineStore} from "pinia";
import {WindowSize} from "../utils/enums/calculator-enums.ts";
import {
    MediumSizeScreenTableNames,
    NormalSizeScreenTableNames,
    SmallSizeScreenTableNames
} from "../utils/constants/tables-names.ts";
import {ref} from "vue";

export const useTableHeadersByWindowSize = defineStore('sizeBuilder', () => {
    let windowSizeByWidth = ref(WindowSize.Small);
    let tableHeaders = ref(SmallSizeScreenTableNames);

    function setNewSize(size: number) {
        // TODO: если новое значение, то только тогда изменить
        let res: WindowSize;

        if (size <= 700) {
            res = WindowSize.Small
        } else if (size > 700 && size < 1080) {
            res = WindowSize.Medium
        } else if (size <= 1080 && size > 1280) {
            res = WindowSize.Normal
        } else {
            res = WindowSize.Large
        }

        if (res !== windowSizeByWidth.value) {
            _setWindowSize(res)
        }
    }

    function _setWindowSize(size: WindowSize) {
        windowSizeByWidth.value = size

        // todo: в другое место
        setHeaders();
    }

    function setHeaders() {
        switch(windowSizeByWidth.value as WindowSize) {
            case WindowSize.Large:
                tableHeaders.value = NormalSizeScreenTableNames
                break
            case WindowSize.Medium:
                tableHeaders.value = MediumSizeScreenTableNames
                break
            default:
                tableHeaders.value = SmallSizeScreenTableNames
        }
        console.log('на вывод ', tableHeaders )
    }

    return {
        windowSizeType: windowSizeByWidth,
        tableHeaders,
        setNewSize
    }
})