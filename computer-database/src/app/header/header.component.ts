import { element } from 'protractor';
import { User } from './../Models/user.model';
import { map } from 'rxjs/operators';
import { Role } from './../Models/role.model';
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { UserLoginComponent } from '../components/users/user-login/user-login.component'
import { Location } from '@angular/common';


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

  constructor(public dialog: MatDialog, 
              private router: Router, 
              private userService: UserService, 
              private location: Location) { }

  openDialog() {
    const dialogRef = this.dialog.open(ComputerAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUserRoles() {
    this.userService.getUser().subscribe((result: User) => {
      this.userRoles = result.roles;
console.log(this.userRoles);
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
}
