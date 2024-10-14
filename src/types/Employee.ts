export interface Employee {
    firstName: string;
    lastName: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    state: string;
    lga: string;
    hireDate: string;
    passport: File | null;
    resume: File | null;
    managerId?: string;
}