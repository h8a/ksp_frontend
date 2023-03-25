export interface BeneficiariesEmployees {
    id: string;
    name: string;
    birthdate: string;
    relationship: string;
    gender: string;
}

export interface Employee {
    id?: string;
    name: string;
    status: string;
    salary: number;
    hire_date: string;
    job: string;
}
