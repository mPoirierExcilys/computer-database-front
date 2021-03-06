import { UserAddFormComponent } from './../user-add-form/user-add-form.component';
import { Component, OnInit, Input } from '@angular/core';
import { CustomMaterialModule } from './../../../custom-material/custom-material.module';
import { Company } from './../../../Models/company.model';
import { UserService } from './../../../service/user.service';
import { Computer } from './../../../Models/computer.model';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { Token } from 'src/app/Models/token.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  pathOrigin: String = "#";
  user: User = new User();
  errorCredentials: boolean = false;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              public dialog: MatDialog){
    let isToLogout : boolean = false;
    if(this.router.getCurrentNavigation().extras.state){
      isToLogout = this.router.getCurrentNavigation().extras.state.isToLogout;
    }
    if(isToLogout) {
      this.onLogout();
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.authenticate(this.user).subscribe(
      (result : Token) => {
        if(result.token){
          this.returnHome();
        }
      },
      error => {
        this.errorCredentials = true;
        console.log(error);
      }
    );
  }

  returnHome(){
    this.router.navigate(["/computers"]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onLogout() {
    this.userService.logout();
    window.location.assign("/login");
  }

  onCancel(){
    this.location.back();
  }
}
