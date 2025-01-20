import api from "../services/axios";
import errorHandle from "./error";
import { ValidationErrors } from "../interface/datatypes";


export const uploadData = async(data:ValidationErrors)=>{
    try {
        
        const response = await api.post('/project/add-restaurant',data)
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}


export const getData = async(page: number = 1, limit: number = 4)=>{
    try {
        const response = await api.get(`/project/get-data?page=${page}&limit=${limit}`)
         return response.data
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err); // Handle error if any
    }
}