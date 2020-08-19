import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/Models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-password-form',
  templateUrl: './user-password-form.component.html',
  styleUrls: ['./user-password-form.component.scss']
})
export class UserPasswordFormComponent implements OnInit {
  passwordFirst = "";
  passwordSecond = "";
  name = "";
  user : User = new User();
  newUser : User = new User();
  constructor(private userService : UserService, private route: ActivatedRoute, private router: Router) { }

  getId(){
    return this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log("On start");
    this.getUser();
  }


  getUser(){
    this.userService.getUser(this.getId()).subscribe(
      result => {
        this.user = result;
        this.user.password = "";
      },
      error => {
        console.log("Request problem with getting User By Id.");
      }
    );
  }

  modifyPassword(){
    if((this.passwordFirst && this.passwordSecond && this.passwordFirst.length > 7 && this.passwordFirst === this.passwordSecond) || (this.name && this.name !== "" && this.user.name !== this.name)){
      if (this.passwordFirst && this.passwordSecond && this.passwordFirst.length > 7 && this.passwordFirst === this.passwordSecond) {
        this.newUser.password = this.passwordFirst;
      } else {
        this.newUser.password = "byDefault";
      }
      if(this.name && this.name !== "" && this.user.name !== this.name){
        this.newUser.name = this.name;
      } else {
        this.newUser.name = this.user.name;
      }
      this.newUser.id = Number(this.getId());
      this.newUser.roles = this.user.roles;
      console.log("avant");
      console.log(this.user);
      this.userService.modify(this.newUser).subscribe(
      result => {
        console.log("après");
        console.log(this.userService.currentUserValue);
        console.log(result);
        console.log(this.user);
        this.user = result;
        if(this.user.id === this.userService.currentUserValue.id){
          console.log("plop");
          this.router.navigate(['/login'], { state : { isToLogout : true}});
        } else {
          console.log("pas plop");
        }
      },
        error => {
          console.log("Request problem with Modification of password : ");
          console.log(error);
      });
    } else {
      console.log("Same value needed for the passwords or a new name is needed.");
    }
  }

  onSubmit(){
    console.log("On n'essaye de modifier le password.");
    this.modifyPassword();
  }
}
