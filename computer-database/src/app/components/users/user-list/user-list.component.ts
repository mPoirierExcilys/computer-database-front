import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/Models/user.model';
import {ComputerService} from '../../../service/computer.service';
import {MatDialog} from '@angular/material/dialog';
import {UserPasswordFormComponent} from '../user-password-form/user-password-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private route: ActivatedRoute;
  usersList: User[] = [];
  userService: UserService;

  displayedColumns: string[] = ['name', 'roles'];

  constructor(private routeParam: ActivatedRoute, userService: UserService, public dialog: MatDialog) {
    this.route = routeParam;
    this.userService = userService;
   }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.userService.getUsers().subscribe(
      (result: User[]) => {
        this.usersList = [];
        result.forEach(user => {
          this.usersList.push(user);
        });
      },
      (error: any) => {
        console.log('Error with the observable in getUsersList.');
      }
    );
  }

  openEditUserDialog(idUser: string): void{
    const dialogRef = this.dialog.open(UserPasswordFormComponent,
      {data: {id: idUser},
       width: '750px'
});

    dialogRef.afterClosed().subscribe( result => {
      if (result){
        this.getList();
      }
    });
  }
}
