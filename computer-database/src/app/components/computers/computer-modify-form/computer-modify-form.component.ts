import { HeaderComponent } from './../../../header/header.component';
import { Location } from '@angular/common';
import { Computer } from './../../../Models/computer.model';
import { Company } from './../../../Models/company.model';
import { Component, OnInit } from '@angular/core';
import { ComputerService } from 'src/app/service/computer.service';
import { CompanyService } from 'src/app/service/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-computer-modify-form',
  templateUrl: './computer-modify-form.component.html',
  styleUrls: ['./computer-modify-form.component.scss']
})
export class ComputerModifyFormComponent implements OnInit {

  computer: Computer = new Computer();
  companies: Company[];
  private routeSub: Subscription;

  isAdministrator: boolean = false;

  constructor(private computerService: ComputerService,
              private companyService: CompanyService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private header: HeaderComponent) { }

  byCompany(company1: Company, company2: Company) {
    return company1?.idCompany === company2?.idCompany;
  }

  setDisplayOn(){
    this.isAdministrator = this.header.isAdministrator;

  }

  getId(){
    return this.route.snapshot.paramMap.get('id');
  }

  goComputerDetails(){
    this.router.navigate(['computer/'+this.getId()]);
  }

  onSubmit(){
    this.computerService.updateComputer(this.computer).subscribe();
    this.location.go("computer/"+this.getId());
    this.location.forward();
    this.goComputerDetails();
  }

  onCancel(){
    this.location.back();
  }

  retriveCompanyList(){
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
          this.companies = result;
      },
      (error) => {
          console.log("can't retrive company list")
      }
  );
  }

  retriveComputer(id: number){
    this.computerService.getComputer(id).subscribe(
      (result: Computer) => {this.computer = result;}
    );
  }

  ngOnInit(): void {
    const id = parseInt(this.getId());
    this.retriveCompanyList();
    this.retriveComputer(id);
    this.setDisplayOn();
    console.log("page" + this.isAdministrator)
    console.log("header" + this.header.isAdministrator)
  }
}
