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
  name : string;
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
  page : Page;
  orders: Order[] = [
    {label: "id", name: "computer.id"},
    {label: "name", name: "computer.name"},
    {label: "introduced", name: "computer.introduced"},
    {label: "discontinued", name: "computer.discontinued"},
    {label: "company name", name: "cp.name"}
  ]

  constructor(private routeParam: ActivatedRoute, computerService: ComputerService) {
    this.route = routeParam;
    this.computerService = computerService;
   }

  ngOnInit(): void {
    this.setPage("ASC", 1, 5, "computer.id");
    this.getList();
  }

  getList() : void {
    this.computerService.getComputers(this.page).subscribe(
      (result: Computer[]) => {
        this.computersList = [];
        result.forEach(computer => {
          this.computersList.push(computer);
        });
        console.log(this.computersList);
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getComputersList.");
      }
    );
  }

  remove(id : number): void{
    this.computerService.deleteComputer(id).subscribe();
  }

  setPage(ascending: string, currentPage: number, itemsByPage: number, order: string) : void {
    this.page = new Page();
    this.page.ascending = ascending;
    this.page.currentPage = currentPage;
    this.page.itemsByPage = itemsByPage;
    this.page.order = order;
  }

  modifOrder(orderSelectEvent :  MatSelectChange) : void {
    this.page.order = orderSelectEvent.value;
    this.getList();
  }

  modifNombreComputers(orderEvent :  MatSelectChange) : void {
    this.page.order = orderEvent.value;
    this.getList();
  }

  nextPage() : void {
    if(this.page.currentPage < this.page.nbPage){
      this.page.currentPage = this.page.currentPage + 1;
      this.getList();
    }
  }

  previousPage() : void {
    if(this.page.currentPage > 0){
      this.page.currentPage = this.page.currentPage - 1;
      this.getList();
    }
  }
}
