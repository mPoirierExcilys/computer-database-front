import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/service/user.service';
import { Role } from 'src/app/Models/role.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.scss']
})
export class UserAddFormComponent implements OnInit {

  username: string;
  passwordFirst: string;
  passwordSecond: string;
  rolesPossibles: Role[] = [];
  rolesSelected: Role[] = [];
  user: User;
  addUserForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = new User();
    this.user.roles = [];
    this.createForm();
    this.userService.getRoles().subscribe(
      result => {
        this.rolesPossibles = result;
      },
      error => {
        console.log('Error with the request of getRoles : ' + error);
      }
    );
  }

  createForm(): void{
    this.addUserForm = this.formBuilder.group({
      name: [''],
      rolesSelected: [''],
      password: [''],
      confirmPassword: ['']
    },
      {validators: this.passwordValidator});
  }

  passwordValidator(form: FormGroup): object{
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;
    if (password !== '' && confirmPassword !== '' && password !== confirmPassword){
      return { noMatchingPassword: 'Passwords not matching' };
    }
    return null;
  }

}
