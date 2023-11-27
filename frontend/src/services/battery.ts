import api from "../constants/api";
import instance from "../utils/axiosConfig";

export const getBatteries = (params?:string)=>instance.get(api.batteries+`${params?params:''}`)
export const postBattery = (data:any)=>instance.post(api.batteries,data)
