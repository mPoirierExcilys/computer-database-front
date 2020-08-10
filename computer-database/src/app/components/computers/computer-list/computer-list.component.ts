import { Component, OnInit } from '@angular/core';
import { Computer } from '../../../Models/computer.model';
import { Page } from '../../../Models/page.model';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/service/computer.service';
import { HttpResponse } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


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
  computersList : Computer[];
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
    console.log("Dans init.");
    this.getList();
  }

  getList(){
    this.setPage("ASC", 1, 25, "id");
    console.log("Dans list.");
    this.computerService.getComputers(this.page, "").subscribe(
      (result: Computer[]) => {
        console.log("Dans bien.");
        this.computersList = result;
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getComputersList.");
      }
    );
  }

  remove(id : number): void{
    this.computerService.deleteComputer(id).subscribe();
  }

  setPage(ascending: string, currentPage: number, itemsByPage: number, order: string){
    this.page = new Page();
    this.page.ascending = ascending;
    this.page.currentPage = currentPage;
    this.page.itemsByPage = itemsByPage;
    this.page.order = order;
  }

  modifOrder(order : Order){
    this.page.order = order.name;
  }
}
