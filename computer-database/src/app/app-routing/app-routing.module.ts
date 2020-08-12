import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerDetailsComponent } from '../components/computers/computer-details/computer-details.component';
import { ComputerListComponent } from '../components/computers/computer-list/computer-list.component';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import { ComputerModifyFormComponent } from '../components/computers/computer-modify-form/computer-modify-form.component';
import { CompanyListComponent } from '../components/companies/company-list/company-list.component';


const routes: Routes = [
  {
    path: 'companies',
    component: CompanyListComponent,
    pathMatch: 'full'
  },
  {
    path: 'computers',
    component: ComputerListComponent,
    pathMatch: 'full'
  },
  {
    path: 'computers/new',
    component: ComputerAddFormComponent,
    pathMatch: 'full'
  },
  {
    path: 'computers/edit/:id',
    component: ComputerModifyFormComponent,
    pathMatch: 'full'
  },
  {
    path: 'computers/:id',
    component: ComputerDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'computers',
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
