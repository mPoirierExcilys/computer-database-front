import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import { Router } from '@angular/router';
import { UserLoginComponent } from '../components/users/user-login/user-login.component'
import {ComputerService} from '../service/computer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  messageLogout = "Logout";

  @Output() logoutEvent = new EventEmitter<string>();

  constructor(public dialog: MatDialog, private router: Router, private computerService: ComputerService) {}

  openDialog(): void{
    const dialogRef = this.dialog.open(ComputerAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.computerService.createComputer(result).subscribe();
      }
    });
  }

  ngOnInit(): void {
  }

  sendLogout() {
    this.router.navigate(['/login'], { state : { isToLogout : true}});
  }
}
