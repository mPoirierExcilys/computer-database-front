import { Component, OnInit, Input } from '@angular/core';
import { CustomMaterialModule } from './../../../custom-material/custom-material.module';
import { Company } from './../../../Models/company.model';
import { UserService } from './../../../service/user.service';
import { Computer } from './../../../Models/computer.model';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { switchMap } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Token } from 'src/app/Models/token.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  
  pathOrigin: String = "#";
  user: User = new User();
  constructor(private userService: UserService, 
              private activatedRoute: ActivatedRoute,  
              private router: Router,              
              private location: Location){
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
        console.log("Problème de loginage. Dommage :(");
      }
    );
  }

  returnHome(){
    this.router.navigate(['computers']);
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onCancel(){
    this.location.back();
  }
}