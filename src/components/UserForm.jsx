import { useState } from "react";
import { createUser } from "../services/userService";

export default function UserForm() {
         const [formValues, setFormValues] = useState({
            firstName: "",
            lastName: "",
            email: "",
            phone:""});
         const [errors, setErrors] = useState({});
         const [loading, setLoading]=useState(false);
        const handleChange = (e) => {
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
                await createUser(formValues);
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
            const { firstName, lastName, email, phone } = formValues;
            const newErrors={};
            if (!firstName.trim()) {
                newErrors.firstName = "First name is required";
            }
            if (!lastName.trim()) {
                newErrors.lastName = "Last name is required";
            }
             const emailRegex = /^[^@]+@[^@]+$/;
            if (!email.trim()) {
                newErrors.email = "Email is required";
            } else if (!emailRegex.test(email)) {
                newErrors.email = "Invalid email format";
            }
            const phoneRegex = /^\d{10}$/;
            if (!phone.trim()) {
                newErrors.phone = "Phone number is required";
            } else if (!phoneRegex.test(phone)) {
                newErrors.phone = "Invalid phone number format";
            }
            setErrors(newErrors); 
            return Object.keys(newErrors).length === 0;
        }
            
    return (
        <div> 
            <h2>Add User</h2>
             <form onSubmit={handleSubmit} >
            <label htmlFor="firstName">First Name:</label><br/>
            <input 
            type="text"
            name="firstName" 
            placeholder="Enter user first name"
            value={formValues.firstName}
            onChange={handleChange} /> <br/>
            {errors.firstName && <div style={{color: "red"}}>{errors.firstName}</div>}

            {/* lastName */}
             <label htmlFor="lastName">Last Name:</label><br/>
             <input 
            type="text" 
            name="lastName" 
            placeholder="Enter user last name"
            value={formValues.lastName}
            onChange={handleChange} /><br/>  
            {errors.lastName && <div style={{color: "red"}}>{errors.lastName}</div>}

                {/* email */}
            <label htmlFor="email">Email:</label><br/>
            <input 
            type="text" 
            name="email" 
            placeholder="Enter user email" 
            value={formValues.email}
            onChange={handleChange} /> <br/>
            {errors.email && <div style={{color: "red"}}>{errors.email}</div>}

            <label htmlFor="phone">Phone Number:</label><br/>
            <input
            type="text"
            name="phone"
            placeholder="Enter user phone number" 
            value={formValues.phone} 
            onChange={handleChange}/><br/>
            {errors.phone && <div style={{color: "red"}}>{errors.phone}</div>}
           <button type="submit" disabled={loading}>
            {loading ? "Adding... ": "Add User"} </button>
           </form>
           <>
              <h2>User details</h2>
           </>
        </div>
    )
}