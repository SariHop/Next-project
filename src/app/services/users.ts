import axios from "axios"
import { IuserForm } from "@/app/types/users"

export const userlogin = async (data: IuserForm) => {

   return (await axios.post('/api/userlogin', data)).data
   
}