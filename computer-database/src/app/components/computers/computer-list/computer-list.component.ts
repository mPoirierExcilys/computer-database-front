import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Computer } from '../../../Models/computer.model';
import { Page } from '../../../Models/page.model';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/service/computer.service';
import { MatSelectChange } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

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
  styleUrls: ['./computer-list.component.scss'],
  template: `<button #ul></button>`
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

  displayedColumns: string[] = ['delete', 'name', 'introduced', 'discontinued', 'companyDto'];

  @ViewChild("ul", {read: ElementRef}) testButton: ElementRef;

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
        this.listOfButtonPage();
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
    this.computerService.deleteComputer(id).subscribe(
      () => {
        this.getList();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du removeComputer.");
      }
    );
  }

  modifOrder2(orderSelectEvent : string) : void {
    this.page.setOrder(orderSelectEvent);
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
      this.listOfButtonPage();
    }
  }

  setCurrentPage(currentPage : number) : void {
    this.page.currentPage = currentPage;
    this.getList();
    this.listOfButtonPage();
  }

  previousPage() : void {
    if(this.page.currentPage > 1){
      this.page.currentPage = this.page.currentPage - 1;
      this.getList();
      this.listOfButtonPage();
    }
  }

  toggleEditMode(): void {

    console.log("coioaiz");
  }

  @ViewChild('test') myDiv: ElementRef;

  deleteSelected(): void {
    console.log("selected");
    var checkBox = document.getElementById("test");

    if(this.myDiv.nativeElement.checked){
      this.myDiv.nativeElement.checked = false;
      console.log(this.myDiv.nativeElement.checked);
    }
    else{
      this.myDiv.nativeElement.checked= true;
      console.log(this.myDiv.nativeElement.checked);
    }
  }

  listOfButtonPage(): void {
    var listNumPage = document.getElementById("listPage");
    var li = [];
    var currentPage = this.page.currentPage;
    var maxPage = this.page.nbPage;
    var clickAttribute = document.createAttribute("click");

    // listNumPage.querySelectorAll('*').forEach(n => n.remove());
    console.log(this.testButton.nativeElement);
    if(currentPage > 1){
      //li.push(document.createElement("button"));
      // listNumPage.firstChild.appendChild(document.createTextNode("<<"));
      listNumPage.firstChild.textContent = "<<";
      this.testButton.nativeElement.style.hidden = false;
      // clickAttribute.value = "setCurrentPage(" + (currentPage - 1) + ")";
      // li[0].setAttribute("\(click\)", "setCurrentPage(" + (currentPage - 1) + ")");
    }

    for(let i = 1; i < 2; i++){
      if((currentPage - (3 - i)) >= 1){
        li.push(document.createElement("button"));
        li[li.length - 1].appendChild(document.createTextNode(String (this.page.currentPage - (2 - i))));
        li[li.length - 1].firstChild.nodeValue = String (this.page.currentPage - (2 - i));
        // clickAttribute.value = "setCurrentPage(" + (this.page.currentPage - (2 - i)) + ")";
        // li[li.length - 1].setAttribute(clickAttribute);
      }
    }

    for(let i = 0; i < 2; i++){
      if((currentPage + i) <= maxPage){
        if((currentPage + i) == currentPage){
        }
        li.push(document.createElement("button"));
        li[li.length - 1].appendChild(document.createTextNode(String (this.page.currentPage + i)));
        li[li.length - 1].firstChild.nodeValue = String (this.page.currentPage + i);
        // clickAttribute.value = "setCurrentPage(" + (this.page.currentPage - (2 - i)) + ")";
        // li[li.length - 1].setAttribute(this.page.currentPage - (2 - i));
      }
    }

    if(currentPage < maxPage){
      li.push(document.createElement("button"));
      li[li.length - 1].appendChild(document.createTextNode(">>"));
      li[li.length - 1].firstChild.nodeValue =">>";
      // clickAttribute.value = "setCurrentPage(" + (currentPage + 1) + ")";
      // li[li.length - 1].setAttribute(clickAttribute);

    }

    for(let i = 0; i < li.length; i++){
      listNumPage.appendChild(li[i]);
    }
  }
}
