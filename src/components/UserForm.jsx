import { useEffect, useState } from "react";
import { createUser, updateUser } from "../services/userService";
import { userFormSchema } from "../schemas/UserFormSchema";

export default function UserForm({onUserCreated, editingUser, setEditingUser}) {
        const [formValues, setFormValues] = useState(()=>{
            return Object.fromEntries(userFormSchema.map(field=>[field.name, ""]))
        });
         const [errors, setErrors] = useState({});
         const [loading, setLoading]=useState(false);

         useEffect(() => {
            if (editingUser) {
               setFormValues(editingUser);
            }
             }, [editingUser]);
         const handleChange =(e)=>{
            const { name, value } = e.target;
            setFormValues(prevValues => ({
                ...prevValues,
                [name]: value
            }));
            setErrors(prevErrors => ({
                ...prevErrors ,
                [name]: ""
            }));
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validateForm()) return;
            try {
                setLoading(true);
                console.log(formValues);
                if(editingUser)
                {
                    await updateUser(editingUser.id, formValues)
                    setEditingUser(null);
                }
                else
                    await createUser(formValues);
                onUserCreated();
                setFormValues({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone:""
                });
            setErrors({});  
            alert("User added successfully");
                
            } catch (error) {
                console.error("failed to add User");
                alert("failed to add User");
            }
            finally{
                setLoading(false)
            }
          
             
        };
        const validateForm = () => 
             {
             const newErrors={};
             userFormSchema.forEach(field=>{
                 const value=formValues[field.name]
                if(field.required && !value.trim())
                   newErrors[field.name]=`${field.name} is mandatory` 
                else if(field.pattern && value && !field.pattern.test(value))
                    newErrors[field.name]=field.errorMessage;
             })
            setErrors(newErrors); 
            return Object.keys(newErrors).length === 0;
        }
            
    return (
        <div> 
            <h2>Add User</h2>
             <form onSubmit={handleSubmit} >
                  {userFormSchema.map(field=>
                    (<div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label><br/>
                               <input 
                                  type={field.type}
                                  name={field.name}
                                  value={formValues[field.name]}
                                  onChange={handleChange} 
                                /> <br/>
                                {errors[field.name] && <div style={{color: "red"}}>{errors[field.name]}</div>}
                        </div>)   
                    
                  )}
                 <button type="submit" disabled={loading}>
                 {loading ? "Processing... ": editingUser ? "Update User" : "Add user"} </button>
             </form>  
        </div>
    )
}