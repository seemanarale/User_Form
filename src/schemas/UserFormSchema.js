export const userFormSchema=[
    {name:"firstName", type:"text", label:"First Name", required:true},
    {name:"lastName", type:"text", label:"Last Name" ,required:true},
    {name: "email", label: "Email", type: "text", required: true,pattern: /^[^@]+@[^@]+$/,
             errorMessage: "Invalid email format"},
    {name:"phone", type:"text", label:"Phone" ,required:true, pattern: /^\d{10}$/,
         errorMessage: "Phone must be 10 digits"}
]