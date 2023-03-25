import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'employees/create', component: CreateEmployeeComponent },
      { path: 'employees/list', component: ListEmployeeComponent },
      { path: 'employees/edit/:id', component: EditEmployeeComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
