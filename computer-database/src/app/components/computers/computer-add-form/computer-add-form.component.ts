import { CompanyService } from './../../../service/company.service';
import { CustomMaterialModule } from './../../../custom-material/custom-material.module';
import { Company } from './../../../Models/company.model';
import { ComputerService } from './../../../service/computer.service';
import { Computer } from './../../../Models/computer.model';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-computer-add-form',
  templateUrl: './computer-add-form.component.html',
  styleUrls: ['./computer-add-form.component.scss']
})



export class ComputerAddFormComponent implements OnInit {


  computer: Computer = new Computer();
  companies: Company[];

  constructor(private computerService: ComputerService, private companyService: CompanyService) { }

  onSubmit(){
    this.computerService.createComputer(this.computer).subscribe();
    console.log(this.computer.name +" "+ this.computer.companyDto.name);
  }


  ngOnInit(): void {
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
