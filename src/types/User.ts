export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface fieldSchema{
    name: keyof UserFormData;
    label: string;
    type: string;
    required: boolean;
    pattern?: RegExp;
    errorMessage?: string;
}