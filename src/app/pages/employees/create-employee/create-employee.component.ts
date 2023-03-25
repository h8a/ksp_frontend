import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styles: [
  ]
})
export class CreateEmployeeComponent implements OnInit {
  public employeeForm: FormGroup;

  constructor( private employeesService: EmployeesService,
               private fb: FormBuilder,
               private router: Router ) {
               }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name:       ['', [Validators.required, Validators.minLength(2)]],
      job:        ['', [Validators.required, Validators.minLength(2)]],
      hire_date:  ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      salary:     [0, [Validators.required, Validators.min(0)]]
    });
  }

  createEmployee() {

    if ( this.employeeForm.invalid ) { return; }

    this.employeesService.createEmployee(this.employeeForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/employees/list');
      });
  }
}
