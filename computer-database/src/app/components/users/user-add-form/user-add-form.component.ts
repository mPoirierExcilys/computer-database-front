import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/service/user.service';
import { Role } from 'src/app/Models/role.model';

@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.scss']
})
export class UserAddFormComponent implements OnInit {

  username : string = "";
  passwordFirst : string = "";
  passwordSecond : string = "";
  rolesPossibles : Role[] = [];
  rolesSelected : Role[] = [];
  user : User = new User();

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getRoles().subscribe(
      result => {
        console.log(result);
        this.rolesPossibles = result;
        console.log(this.rolesPossibles);
        this.rolesSelected.push(this.rolesPossibles.find((role : Role) => {return role.name === "ROLE_USER" ? role : null}));
      },
      error => {
        console.log("Error with the request of getRoles : " + error);
      }
    );
  }

  onSubmit(){
    console.log("On n'essaye de créer un user.");
    console.log(this.username);
    console.log(this.passwordFirst);
    console.log(this.passwordSecond);
    if(this.username && this.passwordFirst && this.passwordSecond && this.passwordFirst === this.passwordSecond){
    this.user.name = this.username;
    this.user.password = this.passwordFirst;
    console.log(this.rolesSelected);
    this.user.roles = this.rolesSelected;
    console.log(this.user);
    this.userService.register(this.user).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log("Error with the request of onSubmit : ");
        console.log(error);
        
      }
    );
    } else {
      console.log("The two password need to be the same.");
    }
  }
}
