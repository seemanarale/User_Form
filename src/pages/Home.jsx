import { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../services/userService";
import UserForm from "../components/UserForm";

export default function Home() {
    const [userList, setUserList]=useState([])
    const[editingUser, setEditingUser]=useState(null)
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
            <UserForm onUserCreated={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser}/>
            <h3>UserList</h3>
            <ul>
              {userList.length === 0 ?( <p>No users found</p>) : 
               userList.map(user=>
               <li key={user.id}> {user.firstName} {user.lastName} {user.email} {user.phone}
               <button onClick={()=>setEditingUser(user)}>Edit</button>
               <button onClick={()=>removeUser(user.id)}>Delete</button>
               </li>
            )}
            </ul> 
        </div>
    );
}