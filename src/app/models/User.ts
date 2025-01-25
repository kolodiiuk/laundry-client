export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role;
}

export enum Role {
    Customer,
    Admin,
}