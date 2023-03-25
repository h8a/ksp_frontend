import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee, BeneficiariesEmployees } from '../interfaces/task.interface';
import { EmployeesModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private baseUrl = environment.baseUrl;

  public employees: EmployeesModel[] = [];

  constructor( private http: HttpClient ) { }

  createEmployee( employee: Employee ) {
    return this.http.post(`${ this.baseUrl }/employees`, employee);
  }

  getEmployees() {
    return this.http.get(`${ this.baseUrl }/employees`);
  }

  getEmployee( id: number ) {
    return this.http.get(`${ this.baseUrl }/employees/${ id }/get`);
  }

  editEmployee( employee: Employee ) {
    return this.http.put(`${ this.baseUrl }/employees/${ employee.id }/put`, employee);
  }

  deleteEmployees( id: string ) {
    return this.http.delete(`${ this.baseUrl }/employees/${ id }/delete`);
  }

  editBeneficiaryEmployee( beneficiary: BeneficiariesEmployees ) {
    return this.http.put(`${ this.baseUrl }/employees/beneficiaries/put/${ beneficiary.id }`, beneficiary);
  }

  deleteBeneficiaryEmployee( beneficiaryId: string ) {
    return this.http.delete(`${ this.baseUrl }/employees/beneficiaries/delete/${ beneficiaryId }`);
  }

  createBeneficiaryEmployee( beneficiary: BeneficiariesEmployees ) {
    return this.http.post(`${ this.baseUrl }/employees/beneficiaries/create`, beneficiary);
  }
}
