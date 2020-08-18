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


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  userForRole: User;

  messageLogout = "Logout";

  @Output() logoutEvent = new EventEmitter<string>();

  constructor(public dialog: MatDialog, private router: Router, private userService: UserService) { }

  openDialog() {
    const dialogRef = this.dialog.open(ComputerAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUserRoles() {
    this.userService.getUser().subscribe((result: User) => {
      console.log("result : " + result.roles[0].name)
      console.log("result : " + result.roles[1].name)
      this.user. roles = result.roles;
    }, (error) => { console.log(error);
  });
}

setUser(){
  this.user = this.userService.currentUserValue;
}

showUser(){
  
}


ngOnInit(): void {
  this.setUser();
  this.getUserRoles();
  console.log(this.user.username);
  console.log(this.user.token);
  console.log(this.user.roles);
}

sendLogout() {
  this.router.navigate(['/login'], { state: { isToLogout: true } });
}
}
