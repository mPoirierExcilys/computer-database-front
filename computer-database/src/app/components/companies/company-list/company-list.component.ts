import { Component, OnInit } from '@angular/core';
import { Company } from '../../../Models/company.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { MatSelectChange } from '@angular/material/select';
import { Page } from 'src/app/Models/page.model';

interface Order {
  label : string;
  value : string;
}

interface Ascending {
  label : string;
  value : string;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  private route : ActivatedRoute;

  companiesList : Company[] = [];
  companyService : CompanyService;

  nbCompanies : number;
  page : Page;
  motSearch : string = "";
  orderSelect = 'company.id';
  ascendingSelect = 'ASC';
  orders : Order[] = [
    {label: "id", value: "company.id"},
    {label: "name", value: "cp.name"},
  ]

  ascendings : Ascending[] = [
    {label: "ASC", value: "ASC"},
    {label: "DESC", value: "DESC"}
  ]

  displayedColumns: string[] = ['delete', 'name'];


  constructor(private routeParam: ActivatedRoute, companyService: CompanyService) {
    this.route = routeParam;
    this.companyService = companyService;
   }

  ngOnInit(): void {
    this.setPage();
    this.getList();
  }


  setPage(){
    this.page = new Page();
    this.page.setItemsByPage(10);
    this.page.setAscending("ASC");
    this.page.setOrder("company.id");
    this.page.setCurrentPage(1);
    this.getNombreCompanies();
    this.getNombrePages();
  }

  getList() : void {
    this.companyService.getCompaniesByPage(this.page, this.motSearch).subscribe(
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

  getNombreCompanies(){
    this.companyService.getNbCompanies(this.motSearch).subscribe(
      (result: number) => {
        this.nbCompanies = result;
        this.getNombrePages();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getNombreCompanies.");
      }
    )
  }

  getNombrePages() {
    if(!this.page.itemsByPage){
      this.page.setItemsByPage(25);
    }
    this.companyService.getNbPages(this.page, this.motSearch).subscribe(
      (result: number) => {
        this.page.setNbPage(result);
        this.MAJCurrentPage();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getNombrePages.");
      }
    )
  }

  MAJCurrentPage(): void{
    if(this.page.currentPage <= 0){
      this.page.currentPage = 1;
    }
    if(this.page.currentPage > this.page.nbPage){
      this.page.currentPage = this.page.nbPage;
    }
    this.getList();
  }


  // remove(id : number): void{
  //   this.companyService.deleteComputer(id).subscribe();
  //   this.getList();
  // }

  modifOrder(orderSelectEvent :  MatSelectChange) : void {
    this.page.setOrder(orderSelectEvent.value);
    this.getList();
  }

  modifAscending(ascendingSelectEvent :  MatSelectChange) : void {
    this.page.setAscending(ascendingSelectEvent.value);
    this.getList();
  }

  modifSearch(motSearch: string): void{
    this.motSearch = motSearch;
    this.getNombreCompanies();
    this.getNombrePages();
    this.getList();
  }

  modifItemsByPage(nombreItems : number) : void {
    this.page.setItemsByPage(nombreItems);
    this.getNombrePages();
  }

  nextPage() : void {
    if(this.page.currentPage < this.page.nbPage){
      this.page.currentPage = this.page.currentPage + 1;
      this.getList();
    }
  }

  previousPage() : void {
    if(this.page.currentPage > 1){
      this.page.currentPage = this.page.currentPage - 1;
      this.getList();
    }
  }
}
