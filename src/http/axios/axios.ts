import axios from "axios";

const BASE_URL = 'http://90.156.224.55/api/dnd/calculator/calculator/races'

export default async function GET() {
// TODO: разбить на сервисы
    let axiosResponse = await axios.get(
        BASE_URL,
    );
    return axiosResponse.data;
}