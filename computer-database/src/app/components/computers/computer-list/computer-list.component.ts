import { Component, OnInit } from '@angular/core';
import { Computer } from '../../../Models/computer.model';
import { Page } from '../../../Models/page.model';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/service/computer.service';
import { HttpResponse } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';


interface Order {
  label : string;
  value : string;
}

interface Ascending {
  label : string;
  value : string;
}

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {
  private route : ActivatedRoute;
  computersList : Computer[] = [];
  computerService : ComputerService;
  nbComputers : number;
  page : Page;
  motSearch : string = "";
  orderSelect = 'computer.id';
  ascendingSelect = 'ASC';
  orders : Order[] = [
    {label: "id", value: "computer.id"},
    {label: "name", value: "computer.name"},
    {label: "introduced", value: "computer.introduced"},
    {label: "discontinued", value: "computer.discontinued"},
    {label: "company name", value: "cp.name"}
  ]

  ascendings : Ascending[] = [
    {label: "ASC", value: "ASC"},
    {label: "DESC", value: "DESC"}
  ]

  constructor(private routeParam: ActivatedRoute, computerService: ComputerService) {
    this.route = routeParam;
    this.computerService = computerService;
   }

  ngOnInit(): void {
    this.setPage();
    this.getList();
  }

  setPage(){
    this.page = new Page();
    this.page.setItemsByPage(25);
    this.page.setAscending("ASC");
    this.page.setOrder("computer.id");
    this.page.setCurrentPage(1);
    this.getNombreComputers();
    this.getNombrePages();
  }

  getNombreComputers(){
    this.computerService.getNbComputer(this.motSearch).subscribe(
      (result: number) => {
        this.nbComputers = result;
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getComputersList.");
      }
    )
  }

  getNombrePages() {
    if(!this.page.itemsByPage){
      this.page.setItemsByPage(25);
    }
    this.computerService.getNbPages(this.page, this.motSearch).subscribe(
      (result: number) => {
        this.page.setNbPage(result);
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getnombrePages.");
      }
    )
  }

  getList() : void {
    this.computerService.getComputers(this.page, this.motSearch).subscribe(
      (result: Computer[]) => {
        this.computersList = [];
        result.forEach(computer => {
          this.computersList.push(computer);
        });
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getComputersList.");
      }
    );
  }

  remove(id : number): void{
    this.computerService.deleteComputer(id).subscribe();
    this.getList();
  }

  modifOrder(orderSelectEvent :  MatSelectChange) : void {
    this.page.setOrder(orderSelectEvent.value);
    this.getList();
  }

  modifAscending(ascendingSelectEvent :  MatSelectChange) : void {
    this.page.setAscending(ascendingSelectEvent.value);
    this.getList();
  }

  modifItemsByPage(nombreItems : number) : void {
    this.page.setItemsByPage(nombreItems);
    this.getNombrePages();
    this.getList();
  }

  modifSearch(motSearch: string): void{
    this.motSearch = motSearch;
    this.getNombreComputers();
    this.getNombrePages();
    this.getList();
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
