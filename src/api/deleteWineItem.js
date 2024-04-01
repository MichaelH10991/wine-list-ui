import { _delete } from "./axiosWrapper"
import config from "../config"

const getWineList = async (userId, id) => {
  return await _delete(`${config.wineListApi.url}/delete-wine-list/${userId}/${id}`)
}

export default getWineList;