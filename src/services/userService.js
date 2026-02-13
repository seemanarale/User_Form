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