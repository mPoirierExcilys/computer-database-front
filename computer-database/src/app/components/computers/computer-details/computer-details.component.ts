import { Component, OnInit } from '@angular/core';
import { Computer } from '../../../Models/computer.model';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from '../../../service/computer.service';
import { HttpResponse } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ComputerEditFormComponent} from '../computer-edit-form/computer-edit-form.component';
import {Company} from '../../../Models/company.model';

export interface ComputerData{
  [x: string]: any;
}

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  computer: Computer;

  constructor(private routeParam: ActivatedRoute, private computerService: ComputerService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.computer = new Computer();
    this.computer.companyDto = new Company();
    this.getComputer();
  }

  getComputer(): void{
    this.computerService.getComputer(Number(this.routeParam.snapshot.paramMap.get('id'))).subscribe(
      (result: Computer) => {
          this.computer = result;
      },
      (error) => {
        console.log('Erreur avec l\'observable lors du getComputer.');
      }
    );
  }

  openEditDialog(): void{
    const dialogRef = this.dialog.open(ComputerEditFormComponent,
      {data: { name: this.computer.name, introduced: this.computer.introduced, discontinued: this.computer.discontinued,
          companyDto: this.computer.companyDto, idComputer: this.computer.idComputer}});

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.computerService.updateComputer(result).subscribe();
        this.getComputer();
      }
    });
  }


}
