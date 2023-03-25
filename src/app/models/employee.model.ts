export class BeneficiariesEmployeesModel {
    id: string;
    status?: string;
    name: string;
    birthdate: string;
    gender: string;
    relationship: string;
}

export class EmployeesModel {
    id?: string;
    name: string;
    status: string;
    salary: number;
    hire_date: string;
    job: string;
    beneficiaries: BeneficiariesEmployeesModel[]
}
