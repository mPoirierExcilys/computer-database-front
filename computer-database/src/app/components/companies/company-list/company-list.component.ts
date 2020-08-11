import { Component, OnInit } from '@angular/core';
import { Company } from '../../../Models/company.model';
import { Page } from '../../../Models/page.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { HttpResponse } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  private route : ActivatedRoute;

  companiesList : Company[] = [];
  companyService : CompanyService;

  constructor(private routeParam: ActivatedRoute, companyService: CompanyService) {
    this.route = routeParam;
    this.companyService = companyService;
   }

  ngOnInit(): void {
    this.getList();
  }

  getList() : void {
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
        this.companiesList = [];
        result.forEach(company => {
          this.companiesList.push(company);
        });
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getCompaniesList." + error);
        console.log(error);
      }
    );
  }

  // remove(id : number): void{
  //   this.computerService.deleteComputer(id).subscribe();
  //   this.getList();
  // }

  // modifOrder(orderSelectEvent :  MatSelectChange) : void {
  //   this.page.setOrder(orderSelectEvent.value);
  //   this.getList();
  // }

  // modifAscending(ascendingSelectEvent :  MatSelectChange) : void {
  //   this.page.setAscending(ascendingSelectEvent.value);
  //   this.getList();
  // }

  // modifSearch(motSearch: string): void{
  //   this.motSearch = motSearch;
  //   this.getNombreComputers();
  //   this.getNombrePages();
  //   this.getList();
  // }
}
