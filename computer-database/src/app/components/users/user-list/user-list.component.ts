import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private route : ActivatedRoute;
  usersList : User[] = [];
  userService : UserService;

  displayedColumns: string[] = ['name', 'roles'];

  constructor(private routeParam: ActivatedRoute, userService: UserService) {
    this.route = routeParam;
    this.userService = userService;
   }

  ngOnInit(): void {
    this.getList();
  }

  getList() : void {
    this.userService.getUsers().subscribe(
      (result: User[]) => {
        this.usersList = [];
        result.forEach(user => {
          this.usersList.push(user);
        });
      },
      (error: any) => {
        console.log("Error with the observable in getUsersList.");
      }
    );
  }



  // remove(id : number): void{
  //   this.computerService.deleteComputer(id).subscribe(
  //     () => {
  //       this.getList();
  //     },
  //     (error: any) => {
  //       console.log("Error with the observable in removeUser.");
  //     }
  //   );
  // }

  // deleteSelected(): void {
  //   console.log("selected");
  //   var checkBox = document.getElementById("selectall");
  // }
}
