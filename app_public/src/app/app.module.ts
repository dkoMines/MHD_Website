import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { HomeComponent } from './home/home.component';
import { FrameworkComponent } from './framework/framework.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { EmployeesComponent } from './employees/employees.component';
import { ManagersComponent } from './managers/managers.component';

@NgModule({
  declarations: [
    HomeComponent,
    FrameworkComponent,
    EmployeeComponent,
    HomepageComponent,
    PageHeaderComponent,
    EmployeesComponent,
    ManagersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
    {
    	path: '',
    	component: HomepageComponent // Specifies the component to use for this route
    }, {
    	path: 'employee',
    	component: EmployeeComponent
    }, {
      path: 'employees/:userID',
      component: EmployeesComponent
    }, {
      path: 'managers/:userID',
      component: ManagersComponent
    }
    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
