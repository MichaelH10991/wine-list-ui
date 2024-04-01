import { post } from "./axiosWrapper"
import config from "../config";

const updateWineList = async (userId, body) => {
  return await post(`${config.wineListApi.url}/update-wine-list/${userId}`, body)
}

export default updateWineList;