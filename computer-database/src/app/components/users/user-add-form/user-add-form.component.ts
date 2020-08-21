import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/service/user.service';
import { Role } from 'src/app/Models/role.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

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
  submitted: boolean;

  constructor(private userService: UserService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<UserAddFormComponent>, private router: Router) { }

  ngOnInit(): void {
    this.submitted = false;
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
      name: ['', [this.inputRequiredValidator, this.userLengthValidator]],
      rolesSelected: ['', [this.rolesValidator]],
      password: ['', [this.inputRequiredValidator, this.passwordLengthValidator]],
      confirmPassword: ['', [this.inputRequiredValidator, this.passwordLengthValidator]]
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

  passwordLengthValidator(formControl: FormControl): object{
    const password = formControl.value;
    if (password !== '' && password.length < 8){
      return { passwordTooShort: 'Passwords must contain at least 8 characteres'};
    }
    return null;
  }

  userLengthValidator(formControl: FormControl): object{
    const name = formControl.value;
    if (name.length < 4){
      return { nameTooShort: 'Name must contain at least 4 characteres'};
    }
    return null;
  }

  inputRequiredValidator(formControl: FormControl): object{
    const name = formControl.value;
    if (name === ''){
      return {
        nameRequired: 'Input is required'
      };
    }
    return null;
  }

  rolesValidator(formControl: FormControl): object{
    const roles = formControl.value;
    if (roles.length === 0){
      return {rolesEmpty: 'Must have at least one role'};
    }
    return null;
  }

  onSubmit(): void{
    this.submitted = true;
    if (!this.addUserForm.valid){
      return;
    }
    this.userService.register(this.user).subscribe(result =>{
      this.dialogRef.close();
      this.router.navigate(['/users']);
    },
      error => {
        this.dialogRef.close();
        this.router.navigate(['/users']);
      });
  }

}
