import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComputerAddFormComponent } from '../components/computers/computer-add-form/computer-add-form.component';
import {TranslateService} from '@ngx-translate/core'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public translate: TranslateService) {
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

}
