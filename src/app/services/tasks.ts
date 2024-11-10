import axios from "axios"
import { TaskForm } from "@/app/types/tasks"

export const taskGet = async () => {
    return (await axios.get(`/api/taskCRUD`)).data
}

export const taskCreate = async (data: TaskForm) => {
    return (await axios.post(`/api/taskCRUD`, data)).data
}

export const taskDelete = async (id: string) => {
    return (await axios.delete(`/api/taskCRUD/${id}`)).data
}

export const taskUpdate = async (data: TaskForm, id: string) => {
    return (await axios.put(`/api/taskCRUD/${id}`, data)).data
} 