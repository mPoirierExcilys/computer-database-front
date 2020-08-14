import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerDetailsComponent } from '../components/computers/computer-details/computer-details.component';
import { ComputerListComponent } from '../components/computers/computer-list/computer-list.component';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import { ComputerModifyFormComponent } from '../components/computers/computer-modify-form/computer-modify-form.component';
import { CompanyListComponent } from '../components/companies/company-list/company-list.component';
import { UserLoginComponent } from '../components/users/user-login/user-login.component';
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'companies',
    component: CompanyListComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'computers',
    component: ComputerListComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'computers/new',
    component: ComputerAddFormComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'computers/edit/:id',
    component: ComputerModifyFormComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'computers/:id',
    component: ComputerDetailsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'computers',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
