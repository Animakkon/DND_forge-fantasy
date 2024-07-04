import GET from "../axios/axios.ts";
import {IRace} from "../../utils/types/calculator-types.ts";

export function getRacesList(): Promise<IRace[]> {
    return GET();
}