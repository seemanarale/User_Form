export interface User {
  id?   : number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
}

export interface fieldSchema{
    name: keyof User;
    label: string;
    type: string;
    required: boolean;
    pattern?: RegExp;
    errorMessage?: string;
}