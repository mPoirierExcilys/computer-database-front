import {Component, Inject, OnInit} from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/Models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Form, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Role} from '../../../Models/role.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ComputerData} from '../../computers/computer-details/computer-details.component';

@Component({
  selector: 'app-user-password-form',
  templateUrl: './user-password-form.component.html',
  styleUrls: ['./user-password-form.component.scss']
})
export class UserPasswordFormComponent implements OnInit {
  passwordFirst = '';
  passwordSecond = '';
  name = '';
  user: User = new User();
  newUser: User;
  editUserForm: FormGroup;
  submitted: boolean;
  rolesPossibles: Role[] = [];
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: ComputerData, public dialogRef: MatDialogRef<UserPasswordFormComponent>) { }

  getId(): string{
    return this.data.id;
  }

  ngOnInit(): void {
    this.newUser = new User();
    this.getUser();
    this.createForm();
    this.submitted = false;
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
    this.editUserForm = this.formBuilder.group({
      rolesSelected: ['', [this.rolesValidator]],
      name: ['', [this.inputRequiredValidator, this.userLengthValidator]],
      password: ['', [this.inputRequiredValidator, this.passwordLengthValidator]],
      confirmPassword: ['', [this.inputRequiredValidator, this.passwordLengthValidator]]
    },
      {validators: [this.passwordValidator]});
  }

  getUser(): void{
    this.userService.getUser(this.getId()).subscribe(
      result => {
        this.user = result;
        this.user.password = '';
        this.newUser.roles = this.user.roles;
        this.newUser.name = this.user.name;
        this.newUser.id = this.user.id;
        this.newUser.password = '';
        console.log(this.newUser.roles);
      },
      error => {
        console.log('Request problem with getting User By Id.');
      }
    );
  }

  compareRole(o1: any, o2: any): boolean{
    return o1.name === o2.name && o1.id === o2.id;
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

  userLengthValidator(formControl: FormControl): object{
    const name = formControl.value;
    if (name.length < 4){
      return { nameTooShort: 'Name must contain at least 4 characteres'};
    }
    return null;
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

  rolesValidator(formControl: FormControl): object{
    const roles = formControl.value;
    if (roles.length === 0){
      return {rolesEmpty: 'Must have at least one role'};
    }
    return null;
  }

  onSubmit(): void{
    this.submitted = true;
    console.log(this.editUserForm.get('rolesSelected').value);
    if (!this.editUserForm.valid){
      return;
    }
    console.log(this.newUser);
    this.userService.modify(this.newUser).subscribe(
      result => {
        this.user = result;
        if (this.user.id === this.userService.currentUserValue.id){
          this.router.navigate(['/login'], { state : { isToLogout : true}});
        } else {
          this.dialogRef.close(true);
        }
      },
      error => {
        console.log('Request problem with Modification of password : ');
        console.log(error);
      }
    );
    // this.modifyPassword();
  }
}
