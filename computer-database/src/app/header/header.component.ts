import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import {TranslateService} from '@ngx-translate/core'; 
import { Router } from '@angular/router';
import { UserLoginComponent } from '../components/users/user-login/user-login.component'
import { UserAddFormComponent } from './../components/users/user-add-form/user-add-form.component';
import { User } from '../Models/user.model';
import { Role } from '../Models/role.model';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  user: User;
  userRoles: Role[];
  isAdministrator: boolean = false;

  messageLogout = "Logout";

  @Output() logoutEvent = new EventEmitter<string>();

  
  constructor(public dialog: MatDialog, private router: Router, public translate: TranslateService, private userService: UserService) {
    translate.addLangs(['en', 'fr']);  
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }


  openDialog() {
    const dialogRef = this.dialog.open(ComputerAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getUserRoles() {
    this.userService.getUser("" + this.userService.currentUserValue.id).subscribe((result: User) => {
      this.userRoles = result.roles;
      this.isAdmin(this.userRoles);
    }, (error) => { console.log(error);
  });
}

setUser(){
  this.user = this.userService.currentUserValue;
}

isAdmin(list: Role[]){
  let self = this;
  list.forEach(function(element){
    for(let name of element.name)
      if(element.name === "ROLE_ADMIN"){
        self.isAdministrator = true;
        break;
      } 
  })
}
 
ngOnInit(): void {
  this.setUser();
  this.getUserRoles();
}

sendLogout() {
  this.router.navigate(['/login'], { state: { isToLogout: true } });
}

  openDialogUser() {
    const dialogRef = this.dialog.open(UserAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
