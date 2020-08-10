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
import {HttpClientModule} from '@angular/common/http';
import {CustomMaterialModule} from './custom-material/custom-material.module';

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
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
