import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ComputerListComponent } from './components/computers/computer-list/computer-list.component';
import { ComputerDetailsComponent } from './components/computers/computer-details/computer-details.component';
import { ComputerAddFormComponent } from './components/computers/computer-add-form/computer-add-form.component';
import { ComputerModifyFormComponent } from './components/computers/computer-modify-form/computer-modify-form.component';
import { ComputerRemoveComponent } from './components/computers/computer-remove/computer-remove.component';
import { UserAddFormComponent } from './components/users/user-add-form/user-add-form.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { CompanyListComponent } from './components/companies/company-list/company-list.component';
import { JwtInterceptor } from '../app/helpers/jwt.interceptor';
import { UserPasswordFormComponent } from './components/users/user-password-form/user-password-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ComputerValidDeleteComponent } from './components/computers/computer-valid-delete/computer-valid-delete.component';
import { Error404Component } from './components/error/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ComputerListComponent,
    ComputerDetailsComponent,
    ComputerAddFormComponent,
    ComputerModifyFormComponent,
    ComputerRemoveComponent,
    UserAddFormComponent,
    UserLoginComponent,
    CompanyListComponent,
    UserPasswordFormComponent,
    UserListComponent,
    ComputerValidDeleteComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
