import axios from "axios"
import { IuserForm } from "@/app/types/users"

export const userlogin = async (data: IuserForm) => {

   return (await axios.post('/api/userLogin', data)).data
}

export const userSubmit = async (data: IuserForm) => {

   return (await axios.post('/api/userSubmit', data)).data
}