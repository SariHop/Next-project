import axios from "axios"
import { CarForm } from "@/app/types/car"

export const carGet = async () => {
    return (await axios.get(`/api/carsCRUD`)).data
}

export const carCreate = async (data: CarForm) => {
    return (await axios.post(`/api/carsCRUD`, data)).data
}

export const carDelete = async (id: string) => {
    return (await axios.delete(`/api/carsCRUD/${id}`)).data
}

export const carUpdate = async (data: CarForm, id: string) => {
    return (await axios.put(`/api/carsCRUD/${id}`, data)).data
} 