import { post } from "./axiosWrapper"
import config from "../config.js"

const createWineList = async (userId, body) => {
  return await post(`${config.wineListApi.url}/create-wine-list/${userId}`, body)
}

export default createWineList;