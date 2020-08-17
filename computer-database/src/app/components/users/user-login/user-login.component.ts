import { UserAddFormComponent } from './../user-add-form/user-add-form.component';
import { Component, OnInit } from '@angular/core';
import { CustomMaterialModule } from './../../../custom-material/custom-material.module';
import { Company } from './../../../Models/company.model';
import { UserService } from './../../../service/user.service';
import { Computer } from './../../../Models/computer.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  pathOrigin: String = "#";
  user: User = new User();
  constructor(private userService: UserService, 
              private router: Router,              
              private location: Location,
              public dialog: MatDialog){}

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.authenticate(this.user).subscribe();
    this.returnHome();
  }

  returnHome(){
    this.router.navigate(['computers']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
}

  onCancel(){
    this.location.back();
  }
}