import axios from "axios"
import { BookForm } from "@/app/types/books"

export const bookGet = async () => {
    return (await axios.get(`/api/bookCRUD`)).data
}

export const bookCreate = async (data: BookForm) => {
    return (await axios.post(`/api/bookCRUD`, data)).data
}

export const bookDelete = async (id: string) => {
    return (await axios.delete(`/api/bookCRUD/${id}`)).data
}

export const bookUpdate = async (data: BookForm, id: string) => {
    return (await axios.put(`/api/bookCRUD/${id}`, data)).data
} 