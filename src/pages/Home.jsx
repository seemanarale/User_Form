
import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import UserForm from "../components/userForm";


export default function Home() {
    const [userList, setUserList]=useState([])
    const fetchUsers=async()=>{
        try {
             const res=await getUsers();
             setUserList(res);
        } catch (error) {
            console.log(error);
            alert("failed to load data");
        }  
    }

    useEffect(() => {
  fetchUsers();
}, []);
    return (
        <div>
            <h1>User Management</h1>
            <UserForm onUserCreated={fetchUsers}/>
            <h3>UserList</h3>
            <ul>
              {userList.length === 0 ?( <p>No users found</p>) : 
               ( userList.map(user=>
               <li key={user.id}> {user.firstName} {user.lastName} {user.email} {user.phone}</li>
            ))}
            </ul> 
        </div>
    );
}