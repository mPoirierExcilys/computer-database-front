import { Role } from './../Models/role.model';
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import { User } from '../Models/user.model';
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
  userRoles: Role[];

  messageLogout = "Logout";

  @Output() logoutEvent = new EventEmitter<string>();
  
  constructor(public dialog: MatDialog, private router: Router, private userService: UserService) {}

  openDialog() {
    const dialogRef = this.dialog.open(ComputerAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getUserRole(){
    this.userService.getUser().subscribe((result: User) => {
      this.user = result;
    })

  }


  ngOnInit(): void {
    this.getUserRole();
  }

  sendLogout() {
    this.router.navigate(['/login'], { state : { isToLogout : true}});
  }
}
