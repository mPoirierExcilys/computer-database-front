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
          if(result){
            this.user.token = result.token;
            this.userService.setUser(this.user);
            this.userService.getYourself().subscribe(result => {
              this.userService.removeUser();
              this.user.id = result.id;
              this.user.roles = result.roles;
              let isAdmin: Boolean = false;
              let self = this;
              this.user.roles.forEach(function(element){
                for(let name of element.name)
                  if(element.name === "ROLE_ADMIN"){
                    isAdmin = true;
                    break;
                  }
              })
              this.userService.setIsAdmin(isAdmin);
              this.userService.setUser(this.user);
              this.returnHome();
            });
          }
          return result;
        // if(result.token){
          // this.returnHome();
        // }
      },
      error => {
        // If wrong username or password
        if(error.status === 401){
          this.errorCredentials = true;
        } 
      }
    );
  }

  returnHome(){
    // this.router.navigate(["/computers"]);
    window.location.assign("/computers");
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
