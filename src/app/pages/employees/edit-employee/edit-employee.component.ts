import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../../services/employees.service';
import { BeneficiariesEmployeesModel, EmployeesModel } from '../../../models/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styles: [
  ]
})
export class EditEmployeeComponent implements OnInit {

  public employeeId: number;

  public employeeForm: FormGroup;
  public employee: EmployeesModel;

  public beneficiaryForm: FormGroup;
  public beneficiary: BeneficiariesEmployeesModel;
  private hasBeneficiary: boolean = false;

  constructor( private employeesService: EmployeesService,
               private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute ) {
               }

  ngOnInit(): void {

    this.employeeId = this.activatedRoute.snapshot.params.id;

    this.employeeForm = this.fb.group({
      name:       ['', [Validators.required, Validators.minLength(2)]],
      job:        ['', [Validators.required, Validators.minLength(2)]],
      hire_date:  ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      salary:     [0, [Validators.required, Validators.min(0)]]
    });

    this.beneficiaryForm = this.fb.group({
      name:       ['', [Validators.required, Validators.minLength(2)]],
      birthdate:  ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender:     ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      relationship: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.getEmployee();
  }

  editEmployee() {
    if ( this.employeeForm.invalid ) { return; }

    this.employee = {
      id: this.employeeId,
      ...this.employeeForm.value
    };

    this.employeesService.editEmployee(this.employee)
      .subscribe(resp => {
        this.router.navigateByUrl('/employees/list');
      });

  }

  editBeneficiary() {
    if ( this.beneficiaryForm.invalid ) { return; }

    if ( this.hasBeneficiary ) {
      this.beneficiary = {
        id: this.employee.beneficiaries[0].id,
        ...this.beneficiaryForm.value
      }

      this.employeesService.editBeneficiaryEmployee(this.beneficiary)
      .subscribe((_: any) => {
        this.router.navigateByUrl('/employees/list');
      });
    } else {
      this.beneficiary = {
        employee_id: this.employeeId,
        ...this.beneficiaryForm.value
      }
      this.employeesService.createBeneficiaryEmployee(this.beneficiary)
        .subscribe((resp: any) => {
          this.router.navigateByUrl('/employees/list');
        });
    }
  }

  getEmployee() {

    this.employeesService.getEmployee(this.employeeId)
      .subscribe((resp: any) => {
        this.employee = resp.data;

        this.employeeForm.get('name').setValue(this.employee.name);
        this.employeeForm.get('job').setValue(this.employee.job);
        this.employeeForm.get('hire_date').setValue(this.employee.hire_date);
        this.employeeForm.get('salary').setValue(this.employee.salary);
        if (this.employee.beneficiaries.length > 0) {
          if (this.employee.beneficiaries[this.employee.beneficiaries.length - 1].status === '1') {
            this.hasBeneficiary = true;
            this.beneficiaryForm.get('name').setValue(this.employee.beneficiaries[this.employee.beneficiaries.length - 1].name);
            this.beneficiaryForm.get('birthdate').setValue(this.employee.beneficiaries[this.employee.beneficiaries.length - 1].birthdate);
            this.beneficiaryForm.get('gender').setValue(this.employee.beneficiaries[this.employee.beneficiaries.length - 1].gender);
            this.beneficiaryForm.get('relationship').setValue(this.employee.beneficiaries[this.employee.beneficiaries.length - 1].relationship);
          }
        }
      });
  }

  deleteBeneficiaryEmployee(event) {
    event.preventDefault();

    this.employeesService.deleteBeneficiaryEmployee(this.employee.beneficiaries[0].id)
      .subscribe((resp: any) => {
        this.router.navigateByUrl('/employees/list');
      });
  }
}
