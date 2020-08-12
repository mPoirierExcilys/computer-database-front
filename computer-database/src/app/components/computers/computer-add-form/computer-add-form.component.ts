import { CompanyService } from './../../../service/company.service';
import { CustomMaterialModule } from './../../../custom-material/custom-material.module';
import { Company } from './../../../Models/company.model';
import { ComputerService } from './../../../service/computer.service';
import { Computer } from './../../../Models/computer.model';
import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-computer-add-form',
  templateUrl: './computer-add-form.component.html',
  styleUrls: ['./computer-add-form.component.scss']
})

export class ComputerAddFormComponent implements OnInit {

  computer: Computer = new Computer();
  companies: Company[];
  pathOrigin: String = "#";

  constructor(private computerService: ComputerService,
              private companyService: CompanyService,
              private location: Location,
              private router: Router){}

  ngOnInit(): void {
    this.getCompanies();
  }

  onSubmit(){
    this.computerService.createComputer(this.computer).subscribe();
    this.returnHome();
  }

  returnHome(){
    this.router.navigate(['computers']);
    console.log("going home");
  }

  onCancel(){
    this.location.back();
  }

  getCompanies(){
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
        this.companies = result;
      },
      (error) => {
        console.log("can't retrive company list")
      }
    );
  }
}
