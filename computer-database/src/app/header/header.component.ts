import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import {TranslateService} from '@ngx-translate/core'; 
import { Router } from '@angular/router';
import { UserLoginComponent } from '../components/users/user-login/user-login.component'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  messageLogout = "Logout";

  @Output() logoutEvent = new EventEmitter<string>();
  
  constructor(public dialog: MatDialog, private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);  
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  openDialog() {
    const dialogRef = this.dialog.open(ComputerAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

  sendLogout() {
    this.router.navigate(['/login'], { state : { isToLogout : true}});
  }
}
