import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { EmployeesService } from '../../../services/employees.service';
import { EmployeesModel } from '../../../models/employee.model';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styles: [
  ]
})
export class ListEmployeeComponent implements OnInit {

  public employees: EmployeesModel[] = [];

  constructor( private employeesService: EmployeesService,
               private router: Router ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeesService.getEmployees()
      .subscribe((resp: any) => {
        this.employees = resp.data;
      });
  }

  deleteEmployees( employee: EmployeesModel ) {
    Swal.fire({
      title: 'Eliminar empleado',
      text: `¿ Eliminar empleado: ${ employee.name } ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then(( result ) => {
      if (result.isConfirmed) {

        this.employeesService.deleteEmployees( employee.id )
          .subscribe((_: any) => {
            this.getEmployees();
            Swal.fire(
              'Empleado eliminado!',
              'El empleado seleccionado ha sido eliminado',
              'success'
            );
          }, (err) => {
            Swal.fire(
              'Error al eliminar empleado!',
              'Vuelva a intentarlo o contacte con el administrador',
              'error'
            );
          });
      }
    });
  }

  editEmployee( id: string ) {
    this.router.navigateByUrl(`/employees/edit/${ id }`);
  }
}
