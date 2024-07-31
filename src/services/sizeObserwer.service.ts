import {setWindowSize} from "../pages/calculateTableBuilder.ts";

export function bodyResizeObserver(entires:any[]) {
    // устанавливаем размер окна - small, medium, large, xLarge
    // если размер окна маленький, подстраиваем отображение
    setWindowSize(entires[0].borderBoxSize[0].inlineSize)
}
