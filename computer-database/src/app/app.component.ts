import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { Role } from './Models/role.model';
import { UserService } from './service/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'computer-database';

  // roles : Role[];

  constructor(private routeParam: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // this.getRoles();
  }


  // getRoles(){
  //   this.userService.getRole().subscribe(
  //     (result : Role[] ) => {
  //       if(result){
  //         this.roles = result;
  //         console.log("plop");
  //         console.log(this.roles);
  //       } else {
  //         console.log("Error with getRoles().");
  //       }
  //     },
  //     error => {
  //       console.log("Error with getRoles().");
  //     }
  //   )
  // }

}
