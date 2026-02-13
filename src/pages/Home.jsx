
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/userService";
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
    const removeUser= async(id)=>{
        try {
             await deleteUser(id);
             setUserList(prev=>prev.filter(u =>u.id !=id))
             fetchUsers();
          
            
        } catch (error) {
            console.error(error);
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
               <li key={user.id}> {user.firstName} {user.lastName} {user.email} {user.phone}
               <button onClick={()=>removeUser(user.id)}>Delete</button></li>
            ))}
            </ul> 
        </div>
    );
}