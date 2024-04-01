import { get } from "./axiosWrapper"
import config from "../config";

const getWineList = async (userId) => {
  return await get(`${config.wineListApi.url}/get-wine-list?userId=${userId}`)
}

export default getWineList;