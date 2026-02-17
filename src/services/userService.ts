import axios from "axios"
import type { User } from "../types/User.js"
const api=axios.create({
    baseURL:"http://localhost:3001/",
    headers:{
        "Content-Type":"application/json"
    },
})

export const createUser = async (user: User) : Promise<User>=> {
        const res= await api.post("/users", user)
        return res.data;   
     
}

export const getUsers= async (): Promise<User[]>=>{
    const res= await api.get("/users");
    return res.data;
}

export const deleteUser=async(id: number): Promise<void>=>{
    await api.delete(`/users/${id}`)
}

export const updateUser=async(id: number, updatedUser: User): Promise<User>=>{
    const res=await api.put(`/users/${id}`, updatedUser);
    return res.data;
}