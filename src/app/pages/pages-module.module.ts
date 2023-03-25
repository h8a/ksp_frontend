import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { SharedModuleModule } from '../shared/shared-module.module';



@NgModule({
  declarations: [
    PagesComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    EditEmployeeComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule,
  ]
})
export class PagesModuleModule { }
