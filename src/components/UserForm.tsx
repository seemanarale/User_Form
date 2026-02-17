import { useEffect, useState } from "react";
import { createUser, updateUser } from "../services/userService.js";
import { userFormSchema } from "../schemas/UserFormSchema.js";
import type { User, UserFormData } from "../types/User.js";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
interface UserFormProps {
  onUserCreated: () => void;
  editingUser: User | null;
  setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function UserForm(
    {onUserCreated, editingUser, setEditingUser}: UserFormProps) {
        const createInitialFormValues = (): UserFormData => {
            const values={} as UserFormData;
            userFormSchema.forEach(field=>
                values[field.name]=""
            );
            return values;
        }   
        const [formValues, setFormValues] = useState<UserFormData>(createInitialFormValues)
        const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
        const [loading, setLoading]=useState(false);
         useEffect(() => {
            if (editingUser) {
               setFormValues(editingUser);
            }
             }, [editingUser]);
         const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
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
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
             const newErrors:Partial<Record<keyof UserFormData, string>> = {};
             userFormSchema.forEach(field=>{
                 const value=formValues[field.name]
                if(field.required && !value.trim())
                   newErrors[field.name]=`${field.name} is mandatory` 
                else if(field.pattern && value && !field.pattern.test(value))
                    newErrors[field.name]=field.errorMessage ?? "Invalid value";
             })
            setErrors(newErrors); 
            return Object.keys(newErrors).length === 0;
        }
            
    return (
       <Paper elevation={3} sx={{p: 3, width: 500, maxWidth: "100%"}}>
       <Typography variant="h6" gutterBottom>
          {editingUser ? "Update User" : "Add User"}
       </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        {userFormSchema.map(field => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formValues[field.name]}
            onChange={handleChange}
            error={Boolean(errors[field.name])}
            helperText={errors[field.name]}
            fullWidth
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : editingUser
            ? "Update User"
            : "Add User"}
        </Button>
      </Box>
    </Paper>
  );

}