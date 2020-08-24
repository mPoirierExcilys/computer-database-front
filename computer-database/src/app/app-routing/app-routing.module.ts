import { NgModule, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerDetailsComponent } from '../components/computers/computer-details/computer-details.component';
import { ComputerListComponent } from '../components/computers/computer-list/computer-list.component';
import { ComputerModifyFormComponent } from '../components/computers/computer-modify-form/computer-modify-form.component';
import { CompanyListComponent } from '../components/companies/company-list/company-list.component';
import { UserLoginComponent } from '../components/users/user-login/user-login.component';
import { UserPasswordFormComponent } from '../components/users/user-password-form/user-password-form.component';
import { AuthGuard } from '../helpers/auth.guard';
import { UserListComponent } from '../components/users/user-list/user-list.component';
import { Error404Component } from '../components/error/error404/error404.component';


const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'computers',
    canActivate: [AuthGuard],
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
    path: 'computers/:id',
    component: ComputerDetailsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '404',
    component: Error404Component,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404',
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
export class AppRoutingModule {
}
