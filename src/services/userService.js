import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3001/",
    headers:{
        "Content-Type":"application/json"
    },
})

export const createUser = async (user) => {
        const res= await api.post("/users", user)
        return res.data;   
     
}

export const getUsers= async ()=>{
    const res= await api.get("/users");
    return res.data;
}

export const deleteUser=async(id)=>{
    await api.delete(`/users/${id}`)
}

export const updateUser=async(id, updatedUser)=>{
    const res=await api.put(`/users/${id}`, updatedUser);
    return res.data;
}