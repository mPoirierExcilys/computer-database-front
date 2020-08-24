import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserLoginComponent } from '../components/users/user-login/user-login.component';
import {ComputerService} from '../service/computer.service';
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
  isAdministrator: Boolean = false;
  messageLogout = 'Logout';

  @Output() logoutEvent = new EventEmitter<string>();

  constructor(public dialog: MatDialog, private router: Router, public translate: TranslateService, private userService: UserService, private computerService: ComputerService) {
    translate.addLangs(['en', 'fr']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.isAdministrator = this.userService.currentIsAdminValue;
  }

  ngOnInit(): void {
    this.user = new User();
    this.setUser();
    this.getUserRoles();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(ComputerAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.computerService.createComputer(result).subscribe(
          comp => { this.router.navigate(['/computers/' + comp]); }
        );
      }
    });
  }

  getUserRoles() {
    if (this.userService.currentUserValue){
      this.userService.getUser('' + this.userService.currentUserValue.id).subscribe((result: User) => {
        this.userRoles = result.roles;
        this.isAdmin(this.userRoles);
        }, (error) => { console.log(error);
      });
    }
  }


  setUser(){
    this.user = this.userService.currentUserValue;
  }

  isAdmin(list: Role[]){
    const self = this;
    list.forEach(function(element){
      for (const name of element.name) {
        if (element.name === 'ROLE_ADMIN'){
          self.isAdministrator = true;
          break;
        }
      }
    });
  }

  sendUserIsAdmin(){
    return this.isAdministrator;
  }

  sendLogout() {
    this.router.navigate(['/login'], { state: { isToLogout: true } });
  }

  openDialogUser(): void {
    const dialogRef = this.dialog.open(UserAddFormComponent, {
      width: '750px',
    });
  }
}
